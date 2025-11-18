import React, { memo } from 'react';
import {
  Dialog,
  XStack,
  YStack,
  Text,
  Button,
  ScrollView,
  Image,
} from 'tamagui';
import { Heart, Trash2, X, Clock } from '@tamagui/lucide-icons';

import { DetectionRecord } from '@store/detectionHistoryStore';
import { getConfidenceLevel } from '@utils/getConfidenceLevel';
import { theme, YCM_COLORS } from '@styles/imgs/themes';
import RenderRecordDetailCard from './RenderRecordDetailCard';
import { getTimeInfo } from '@utils/date';

interface Props {
  record: DetectionRecord | null | undefined;
  isFavorite: boolean;
  onClose: () => void;
  onToggleFavorite: () => void;
  onDelete: () => void;
  formatFullDate: (ts: number) => string;
}

export const RecordDetailDialog = memo(function RecordDetailDialog({
  record,
  isFavorite,
  onClose,
  onToggleFavorite,
  onDelete,
  formatFullDate,
}: Props) {
  if (!record) return null;

  const ui = getConfidenceLevel(record.confidence, record.isMoldy);

  const timeInfo = getTimeInfo(record);

  return (
    <Dialog modal open={!!record} onOpenChange={open => !open && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay
          key="overlay"
          animation="quick"
          enterStyle={{ opacity: 0 }}
          exitStyle={{ opacity: 0 }}
          opacity={0.5}
          backgroundColor="rgba(0,0,0,0.6)"
        />

        <Dialog.Content
          key="content"
          bordered
          elevate
          animation="quick"
          width="90%"
          maxWidth={420}
          height="80%"
          backgroundColor="white"
          borderRadius={20}
          padding="$4"
        >
          <ScrollView showsVerticalScrollIndicator={false}>
            {/* Header */}
            <XStack
              justifyContent="space-between"
              alignItems="center"
              marginBottom="$3"
            >
              <XStack gap="$2">
                <Text fontSize="$7" fontWeight="700" color={YCM_COLORS.dark}>
                  📋 檢測報告
                </Text>

                <XStack alignItems="center" gap="$2" marginTop="$1">
                  <Clock size={14} color="$gray10" />
                  <Text fontSize="$2" color="$gray10">
                    {timeInfo.timeAgo}
                  </Text>
                </XStack>
              </XStack>

              <Dialog.Close asChild>
                <Button
                  size="$3"
                  circular
                  backgroundColor="$gray3"
                  icon={<X size={20} color="$gray10" />}
                  onPress={onClose}
                  pressStyle={{ backgroundColor: '$gray4', scale: 0.95 }}
                />
              </Dialog.Close>
            </XStack>

            {/* 檢測圖片 */}
            <YStack
              width="100%"
              borderRadius={12}
              overflow="hidden"
              backgroundColor="$gray3"
              borderWidth={3}
              borderColor={ui.borderColor}
              marginBottom="$4"
            >
              <Image
                source={{ uri: record.imageUri }}
                width="100%"
                height={240}
                resizeMode="cover"
              />
            </YStack>

            {/* 詳細資訊卡片 */}
            <RenderRecordDetailCard record={record} timeInfo={timeInfo} />

            {/* --- 按鈕 --- */}
            <XStack gap="$2" marginBottom="$3">
              {/* 收藏 */}
              <Button
                flex={1}
                size="$4"
                backgroundColor={isFavorite ? theme.heartIcon.bg : '$gray4'}
                borderWidth={isFavorite ? 1 : 0}
                borderColor={
                  isFavorite ? theme.heartIcon.border : 'transparent'
                }
                icon={
                  <Heart
                    size={20}
                    color={
                      isFavorite ? theme.heartIcon.fill : theme.heartIcon.unfill
                    }
                    fill={isFavorite ? theme.heartIcon.fill : 'transparent'}
                  />
                }
                onPress={onToggleFavorite}
              >
                <Text
                  fontSize="$4"
                  color={isFavorite ? theme.error.color : '$gray11'}
                >
                  {isFavorite ? '取消收藏' : '加入收藏'}
                </Text>
              </Button>

              {/* 刪除 */}
              <Button
                flex={1}
                size="$4"
                bg={theme.error.color}
                icon={<Trash2 size={20} color="white" />}
                onPress={onDelete}
              >
                <Text fontSize="$4" fontWeight="600" color="white">
                  刪除
                </Text>
              </Button>
            </XStack>
          </ScrollView>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog>
  );
});
