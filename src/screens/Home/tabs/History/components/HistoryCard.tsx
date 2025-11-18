import React from 'react';
import { Card, XStack, YStack, Text, Button, Image } from 'tamagui';
import { Heart, AlertCircle, CheckCircle } from '@tamagui/lucide-icons';
import { DetectionRecord } from '@store/detectionHistoryStore';
import { theme } from '@styles/imgs/themes';

interface Props {
  record: DetectionRecord;
  onPress: () => void;
  onToggleFavorite: () => void;
  formatDate: (ts: number) => string;
}

export function HistoryCard({
  record,
  onPress,
  onToggleFavorite,
  formatDate,
}: Props) {
  return (
    <Card
      elevate
      bordered
      pressStyle={{ opacity: 0.9 }}
      animation="bouncy"
      onPress={onPress}
      backgroundColor="white"
      br="$4"
      p="$3"
    >
      <XStack gap="$3" ai="center">
        {/* 縮圖 */}
        <Card br="$4" overflow="hidden" width={80} height={80}>
          <Image
            source={{ uri: record.imageUri }}
            style={{ width: '100%', height: '100%' }}
          />
        </Card>

        {/* 資訊 */}
        <YStack f={1} gap="$2">
          <XStack ai="center" gap="$2">
            {record.isMoldy ? (
              <AlertCircle size={20} color={theme.error.color} />
            ) : (
              <CheckCircle size={20} color={theme.sucess.color} />
            )}

            <Text
              fontSize="$4"
              fontWeight="bold"
              color={record.isMoldy ? theme.error.color : theme.sucess.color}
            >
              {record.isMoldy ? '檢測到發霉' : '未檢測到發霉'}
            </Text>
          </XStack>

          <XStack gap="$3">
            <Text fontSize="$2" color="$gray10">
              信心度: {record.confidence}%
            </Text>
            <Text fontSize="$2" color="$gray9">
              {formatDate(record.timestamp)}
            </Text>
          </XStack>
        </YStack>

        {/* 收藏按鈕 */}
        <Button
          circular
          size="$3"
          bg={record.isFavorite ? theme.heartIcon.bg : '$gray4'}
          icon={
            <Heart
              size={18}
              color={record.isFavorite ? theme.heartIcon.fill : '$gray10'}
              fill={record.isFavorite ? theme.heartIcon.fill : 'transparent'}
            />
          }
          onPress={onToggleFavorite}
        />
      </XStack>
    </Card>
  );
}
