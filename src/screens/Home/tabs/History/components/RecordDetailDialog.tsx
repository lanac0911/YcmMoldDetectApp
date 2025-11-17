import React, { memo } from 'react';
import { Dialog, XStack, YStack, Text, Image, Button } from 'tamagui';
import {
  AlertCircle,
  CheckCircle,
  Heart,
  Trash2,
  X,
} from '@tamagui/lucide-icons';
import { DetectionRecord } from '@store/detectionHistoryStore';

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
  return (
    <Dialog modal open={!!record} onOpenChange={open => !open && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay
          key="overlay"
          animation="quick"
          enterStyle={{ opacity: 0 }}
          exitStyle={{ opacity: 0 }}
          opacity={0.5}
          bg="rgba(0,0,0,0.5)"
        />

        <Dialog.Content
          key="content"
          animation={[
            'quick',
            {
              opacity: {
                overshootClamping: true,
              },
              scale: {
                overshootClamping: true,
              },
            },
          ]}
          enterStyle={{ opacity: 0, scale: 0.85 }}
          exitStyle={{ opacity: 0, scale: 0.9 }}
          bordered
          elevate
          br="$5"
          w="90%"
        >
          {record && (
            <>
              {/* Header */}
              <XStack jc="space-between" ai="center">
                <Text fontSize="$6" fontWeight="bold">
                  檢測詳情
                </Text>
                <Dialog.Close asChild>
                  <Button size="$2" circular onPress={onClose} icon={<X />} />
                </Dialog.Close>
              </XStack>

              {/* 圖片 */}
              <YStack br="$4" overflow="hidden" mt="$3">
                <Image
                  source={{ uri: record.imageUri }}
                  style={{ width: '100%', height: 260 }}
                />
              </YStack>

              {/* 結果 card */}
              <YStack
                p="$4"
                mt="$3"
                br="$4"
                bg={record.isMoldy ? '$red3' : '$green3'}
                borderWidth={2}
                borderColor={record.isMoldy ? '$red8' : '$green8'}
              >
                <XStack ai="center" gap="$2">
                  {record.isMoldy ? (
                    <AlertCircle size={28} color="$red10" />
                  ) : (
                    <CheckCircle size={28} color="$green10" />
                  )}

                  <Text fontSize="$6" fontWeight="bold">
                    {record.isMoldy ? '⚠️ 檢測到發霉' : '✓ 未檢測到發霉'}
                  </Text>
                </XStack>

                <Text mt="$2" color="$gray10">
                  檢測時間：{formatFullDate(record.timestamp)}
                </Text>
              </YStack>

              {/* 收藏＆刪除 */}
              <XStack mt="$4" gap="$2">
                <Button
                  f={1}
                  bg={isFavorite ? '$red4' : '$gray4'}
                  icon={<Heart fill={isFavorite ? 'red' : 'transparent'} />}
                  onPress={onToggleFavorite}
                >
                  {isFavorite ? '取消收藏' : '加入收藏'}
                </Button>

                <Button
                  f={1}
                  bg="$red4"
                  icon={<Trash2 color="$red10" />}
                  onPress={onDelete}
                >
                  刪除
                </Button>
              </XStack>
            </>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog>
  );
});
