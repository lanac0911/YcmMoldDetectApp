// 檢測結果 (拍照 → OpenAI 分析 → ResultScreen)
export interface DetectionResult {
  imageUri: string; // 圖片 URI
  isMoldy: boolean; // 是否發霉
  confidence: number; // 模型信心分數 0~1
  analysisText?: string; // (可選) OpenAI 回傳的描述文字
  modelName?: string; // (可選) 使用的模型，例如 gpt-4o-mini
  recordId?: string; // (可選) 儲存到歷史紀錄後的 ID
}
