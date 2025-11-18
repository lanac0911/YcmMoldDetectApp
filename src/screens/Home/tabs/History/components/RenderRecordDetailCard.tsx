import React from 'react';
import { XStack, YStack, Text, View } from 'tamagui';
import {
  Calendar,
  AlertCircle,
  CheckCircle,
  AlertTriangle,
  TrendingUp,
  Hash,
} from '@tamagui/lucide-icons';
import { getConfidenceLevel } from '@utils/getConfidenceLevel';
import { YCM_COLORS } from '@styles/imgs/themes';
import { DetectionRecord } from '@store/detectionHistoryStore';

interface RenderRecordDetailCardProps {
  record: DetectionRecord;
  timeInfo: {
    fullDate: string;
    timeAgo: string;
  };
}

export default function RenderRecordDetailCard({
  record,
  timeInfo,
}: RenderRecordDetailCardProps) {
  const ui = getConfidenceLevel(record.confidence, record.isMoldy);

  // 根據結果選 icon
  const getResultIcon = () => {
    if (record.confidence >= 75) {
      return record.isMoldy ? (
        <AlertCircle size={16} color="#DC2626" />
      ) : (
        <CheckCircle size={16} color="#059669" />
      );
    }
    return <AlertTriangle size={16} color="#D97706" />;
  };

  // 根據結果選背景
  const getIconBgColor = (type: 'result' | 'confidence' | 'neutral') => {
    if (type === 'result') {
      if (record.confidence >= 75) {
        return record.isMoldy ? '#FEE2E2' : '#D1FAE5';
      }
      return '#FEF3C7';
    }
    if (type === 'confidence') {
      return ui.bgColor;
    }
    return '$gray2';
  };

  return (
    <View
      padding="$3.5"
      borderRadius={12}
      backgroundColor="$gray2"
      borderWidth={1}
      borderColor="$gray4"
      marginBottom="$4"
    >
      {/* 標題 */}
      <XStack alignItems="center" gap="$2" marginBottom="$3">
        <Text fontSize="$5" fontWeight="700" color={YCM_COLORS.dark}>
          檢測資訊
        </Text>
        <View
          paddingHorizontal="$2"
          paddingVertical="$0.5"
          borderRadius={6}
          backgroundColor={ui.bgColor}
        >
          <Text fontSize="$1" fontWeight="700" color={ui.color}>
            {ui.description}
          </Text>
        </View>
      </XStack>

      <YStack gap="$3">
        {/* 檢測時間 */}
        <XStack alignItems="center" gap="$3">
          <View
            width={36}
            height={36}
            borderRadius={18}
            backgroundColor="$gray3"
            justifyContent="center"
            alignItems="center"
          >
            <Calendar size={18} color="$gray11" />
          </View>

          <YStack flex={1}>
            <Text fontSize="$2" color="$gray10" marginBottom="$0.5">
              檢測時間
            </Text>
            <Text fontSize="$3" fontWeight="600" color={YCM_COLORS.dark}>
              {timeInfo.fullDate}
            </Text>
          </YStack>
        </XStack>

        {/* 分隔線 */}
        <View height={1} backgroundColor="$gray5" marginHorizontal="$2" />

        {/* 檢測結果 */}
        <XStack alignItems="center" gap="$3">
          <View
            width={36}
            height={36}
            borderRadius={18}
            backgroundColor={getIconBgColor('result')}
            justifyContent="center"
            alignItems="center"
          >
            {getResultIcon()}
          </View>

          <YStack flex={1}>
            <Text fontSize="$2" color="$gray10" marginBottom="$0.5">
              檢測結果
            </Text>
            <Text fontSize="$3" fontWeight="700" color={ui.color}>
              {record.isMoldy ? '⚠️ 檢測到發霉' : '✓ 未檢測到發霉'}
            </Text>
          </YStack>
        </XStack>

        {/* 分隔線 */}
        <View height={1} backgroundColor="$gray5" marginHorizontal="$2" />

        {/* AI 信心度 */}
        <XStack alignItems="center" gap="$3">
          <View
            width={36}
            height={36}
            borderRadius={18}
            backgroundColor={getIconBgColor('confidence')}
            justifyContent="center"
            alignItems="center"
          >
            <TrendingUp size={18} color={ui.color} />
          </View>

          <YStack flex={1}>
            <Text fontSize="$2" color="$gray10" marginBottom="$0.5">
              AI 信心度
            </Text>
            <XStack alignItems="center" gap="$2">
              <Text fontSize="$4" fontWeight="800" color={ui.color}>
                {record.confidence}%
              </Text>
            </XStack>
          </YStack>
        </XStack>

        {/* 分隔線 */}
        <View height={1} backgroundColor="$gray5" marginHorizontal="$2" />

        {/* 檢測編號 */}
        <XStack alignItems="center" gap="$3">
          <View
            width={36}
            height={36}
            borderRadius={18}
            backgroundColor="$gray3"
            justifyContent="center"
            alignItems="center"
          >
            <Hash size={18} color="$gray11" />
          </View>

          <YStack flex={1}>
            <Text fontSize="$2" color="$gray10" marginBottom="$0.5">
              檢測編號
            </Text>
            <Text
              fontSize="$2"
              fontWeight="600"
              color="$gray11"
              fontFamily="$mono"
              letterSpacing={0.5}
            >
              {record.id.substring(0, 8).toUpperCase()}
            </Text>
          </YStack>
        </XStack>
      </YStack>
    </View>
  );
}
