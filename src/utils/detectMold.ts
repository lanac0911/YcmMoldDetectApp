import RNFS from 'react-native-fs';
import { OPENAI_API_KEY as API_KEY } from '@env';

const API_URL = 'https://api.openai.com/v1/responses';

export interface MoldDetectionResult {
  isMoldy: boolean;
  confidence: number;
  explanation: string;
}

// 圖片轉 base64
async function convertToBase64(uri: string): Promise<string> {
  const clean = uri.replace('file://', '');
  return RNFS.readFile(clean, 'base64');
}

// 從 Responses API 抽取 output_text
function extractOutputText(json: any): string {
  if (!json?.output || !Array.isArray(json.output)) {
    throw new Error('Invalid OpenAI output format');
  }

  let combinedText = '';

  const firstMessage = json.output[0];
  const contents = firstMessage?.content ?? [];

  for (const block of contents) {
    if (block.type === 'output_text' && typeof block.text === 'string') {
      combinedText += block.text + '\n';
    }
  }

  if (!combinedText.trim()) {
    throw new Error('No output_text found');
  }

  return combinedText.trim();
}

// 文字中提取 JSON
const extractJsonString = (raw: string): string => {
  const start = raw.indexOf('{');
  const end = raw.lastIndexOf('}');

  if (start === -1 || end === -1) {
    throw new Error('Invalid JSON format');
  }

  return raw.slice(start, end + 1);
};

export async function analyzeImageMold(
  imageUri: string,
): Promise<MoldDetectionResult> {
  try {
    const base64 = await convertToBase64(imageUri);

    const payload = {
      model: 'gpt-4o-mini',
      max_output_tokens: 300,
      input: [
        {
          role: 'user',
          content: [
            {
              type: 'input_text',
              text: `
              你是一個「霉菌檢測 AI 專家」，請非常仔細地分析這張圖片，判斷是否出現「發霉 / 霉菌」的跡象。
              
              請依照以下規則思考：
              1. 霉菌常見特徵：
                 - 黑色、綠色、白色等不規則斑點或大片
                 - 表面有毛絨狀、粉末狀、絨毛狀的結構
                 - 潮濕、腐爛、變色區域，特別是牆面、天花板、食物、木頭、織品表面
              2. 如果圖片是「卡通、插畫、ICON、UI 截圖、文字圖片」等非真實照片：
                 - 一律視為沒有霉菌（isMoldy = false）
                 - confidence 直接為 100
                 - 在 explanation 中說明「這是一張插畫／非真實照片」之類原因
              3. 如果畫面模糊、過暗或被遮擋，導致難以判斷：
                 - isMoldy 請根據目前可見資訊做最佳估計
                 - confidence 請偏低（例如 0–50），並在 explanation 中說明為何不確定
              
              「confidence」定義如下：
              - 型別：number
              - 範圍：0–100
              - 意義：AI 對自己「這張圖片是否有霉菌」整體判斷的信心百分比
                - 越接近 100：越確定目前的 isMoldy 判斷是正確的
                - 越接近 0：幾乎沒有霉菌跡象，或圖片與霉菌無關
                - 中間值：畫面不清楚、不完整或只有輕微疑似跡象
              
              請務必只回傳**乾淨 JSON**，不要加上任何其他說明文字、前後綴或 Markdown。
              
              JSON 格式如下：
              {
                "isMoldy": boolean,
                "confidence": number,
                "explanation": string
              }
              `.trim(),
            },
            {
              type: 'input_image',
              image_url: `data:image/jpeg;base64,${base64}`,
            },
          ],
        },
      ],
    };

    const res = await fetch(API_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const json = await res.json();

    if (json.error) throw new Error(json.error.message);

    // ========== 解析 output_text= ===============
    const rawText = extractOutputText(json);

    // ========== 從文字中擷取 JSON ================
    const jsonString = extractJsonString(rawText);
    const parsed = JSON.parse(jsonString);

    return {
      isMoldy: Boolean(parsed.isMoldy),
      confidence: Number(parsed.confidence) || 0,
      explanation: String(parsed.explanation) || '無說明',
    };
  } catch (err) {
    console.error('❌ analyzeImageMold Error:', err);

    return {
      isMoldy: false,
      confidence: 0,
      explanation: 'AI 無法分析圖片，請重新拍照',
    };
  }
}
