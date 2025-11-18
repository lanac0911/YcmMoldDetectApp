import React, { memo } from 'react';
import { Dialog, XStack, YStack, Text, View, Button } from 'tamagui';
import { Image, StyleSheet } from 'react-native';
import {
  AlertCircle,
  CheckCircle,
  HelpCircle,
  Heart,
  Trash2,
  X,
} from '@tamagui/lucide-icons';
import { DetectionRecord } from '@store/detectionHistoryStore';
import { getConfidenceLevel } from '@utils/getConfidenceLevel';
import { YCM_COLORS } from '@styles/imgs/themes';
import ConfidenceResultCard from '@components/ConfidenceResultCard';

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
          animation={[
            'quick',
            {
              opacity: { overshootClamping: true },
              scale: { overshootClamping: true },
            },
          ]}
          enterStyle={{ opacity: 0, scale: 0.9, y: -20 }}
          exitStyle={{ opacity: 0, scale: 0.95, y: 10 }}
          bordered
          elevate
          borderRadius={20}
          width="90%"
          maxWidth={420}
          backgroundColor="white"
          padding="$4"
          gap="$4"
        >
          {/* Header */}
          <XStack justifyContent="space-between" alignItems="center">
            <Text fontSize="$7" fontWeight="bold" color={YCM_COLORS.dark}>
              檢測報告
            </Text>
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

          {/* 圖片 */}
          <View
            width="100%"
            borderRadius={12}
            overflow="hidden"
            backgroundColor="$gray3"
            borderWidth={3}
            borderColor={ui.borderColor}
          >
            <Image
              source={{ uri: record.imageUri }}
              style={styles.image}
              resizeMode="cover"
            />
          </View>

          {/* 結果 card */}
          <ConfidenceResultCard
            ui={ui}
            confidence={record.confidence}
            showSuggestion={false}
          />

          {/* 操作按鈕 */}
          <XStack gap="$2">
            {/* 收藏按鈕 */}
            <Button
              flex={1}
              size="$4"
              backgroundColor={isFavorite ? '#FEE2E2' : '$gray4'}
              borderWidth={isFavorite ? 1 : 0}
              borderColor={isFavorite ? '#FCA5A5' : 'transparent'}
              icon={
                <Heart
                  size={20}
                  color={isFavorite ? '#EF4444' : '#6B7280'}
                  fill={isFavorite ? '#EF4444' : 'transparent'}
                  strokeWidth={2}
                />
              }
              onPress={onToggleFavorite}
              pressStyle={{
                backgroundColor: isFavorite ? '#FEE2E2' : '$gray5',
                scale: 0.98,
              }}
            >
              <Text
                fontSize="$4"
                fontWeight="bold"
                color={isFavorite ? '#DC2626' : '$gray11'}
              >
                {isFavorite ? '取消收藏' : '加入收藏'}
              </Text>
            </Button>

            {/* 刪除按鈕 */}
            <Button
              flex={1}
              size="$4"
              backgroundColor="$red4"
              icon={<Trash2 size={20} color="$red10" />}
              onPress={onDelete}
              pressStyle={{
                backgroundColor: '$red5',
                scale: 0.98,
              }}
            >
              <Text fontSize="$4" fontWeight="bold" color="$red11">
                刪除
              </Text>
            </Button>
          </XStack>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog>
  );
});

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 240,
  },
});
