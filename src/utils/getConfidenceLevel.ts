import React from 'react';
import {
  AlertCircle,
  CheckCircle,
  AlertTriangle,
  HelpCircle,
} from '@tamagui/lucide-icons';

export type IconComponent = React.ComponentType<{
  size?: number;
  color?: string;
}>;

export interface ConfidenceUI {
  level: 1 | 2 | 3;
  title: string;
  description: string;
  color: string;
  bgColor: string;
  borderColor: string;
  icon: IconComponent;
  emoji: string;
  suggestion: string;
  actionText: string;
}

export function getConfidenceLevel(
  confidence: number,
  isMoldy: boolean,
): ConfidenceUI {
  // 高信心度 (75%+)
  if (confidence >= 75) {
    if (isMoldy) {
      return {
        level: 1,
        title: '⚠️ 檢測到發霉',
        description: '高度可信',
        color: '#DC2626',
        bgColor: '#FEE2E2',
        borderColor: '#F87171',
        icon: AlertCircle,
        emoji: '🔴',
        suggestion: 'AI 高度確信此處有發霉跡象，建議立即清理並保持乾燥通風。',
        actionText: '查看除霉商品',
      };
    } else {
      return {
        level: 1,
        title: '✓ 未檢測到發霉',
        description: '高度可信',
        color: '#059669',
        bgColor: '#D1FAE5',
        borderColor: '#34D399',
        icon: CheckCircle,
        emoji: '🟢',
        suggestion: 'AI 確認此處狀態良好，未發現發霉跡象，請繼續保持乾燥。',
        actionText: '查看防霉商品',
      };
    }
  }

  // 中信心度 (45-74%)
  if (confidence >= 45) {
    if (isMoldy) {
      return {
        level: 2,
        title: '⚡ 疑似發霉',
        description: '中度可信',
        color: '#D97706',
        bgColor: '#FEF3C7',
        borderColor: '#FBBF24',
        icon: AlertTriangle,
        emoji: '🟠',
        suggestion: 'AI 偵測到可能的發霉跡象，建議從不同角度重新拍攝以確認。',
        actionText: '重新檢測',
      };
    } else {
      return {
        level: 2,
        title: '💡 狀態不明',
        description: '中度可信',
        color: '#CA8A04',
        bgColor: '#FEF9C3',
        borderColor: '#FDE047',
        icon: AlertTriangle,
        emoji: '🟡',
        suggestion: 'AI 未能明確判斷，建議增加光線或調整拍攝角度後重新檢測。',
        actionText: '重新檢測',
      };
    }
  }

  // 低信心度 (<45%)
  return {
    level: 3,
    title: '❓ 無法判定',
    description: '低可信度',
    color: '#475569',
    bgColor: '#F1F5F9',
    borderColor: '#94A3B8',
    icon: HelpCircle,
    emoji: '⚪',
    suggestion:
      'AI 無法做出可靠判斷，請確保：①充足光線 ②清晰對焦 ③適當距離，然後重新拍攝。',
    actionText: '重新拍攝',
  };
}
