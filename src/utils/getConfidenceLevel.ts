export interface ConfidenceUI {
  level: 1 | 2 | 3;
  title: string;
  color: string;
  bgColor: string;
  icon: string;
  suggestion: string;
}

export function getConfidenceLevel(
  confidence: number,
  isMoldy: boolean,
): ConfidenceUI {
  if (confidence > 0.75) {
    return {
      level: 1,
      title: isMoldy ? '高度可信：偵測到發霉' : '高度可信：未偵測到發霉',
      color: '#2E7D32',
      bgColor: '#E8F5E9',
      icon: '🟢',
      suggestion: 'AI 對結果相當確定，可放心依此判定。',
    };
  }

  if (confidence > 0.45) {
    return {
      level: 2,
      title: isMoldy ? '中度可信：疑似發霉' : '中度可信：不明顯的霉斑',
      color: '#F9A825',
      bgColor: '#FFF8E1',
      icon: '🟡',
      suggestion: '建議再從不同角度或光源拍攝照片確認。',
    };
  }

  return {
    level: 3,
    title: '低可信度：AI 對判定不確定',
    color: '#C62828',
    bgColor: '#FFEBEE',
    icon: '🔴',
    suggestion: '建議重新拍照、調整距離或增加光線。',
  };
}
