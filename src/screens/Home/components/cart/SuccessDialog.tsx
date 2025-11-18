import React from 'react';
import { YStack, XStack, Text, View, Dialog } from 'tamagui';
import { CheckCircle } from '@tamagui/lucide-icons';
import { YCM_COLORS } from '@styles/imgs/themes';

export default function ({
  showSuccessDialog,
  checkoutInfo,
}: {
  showSuccessDialog: boolean;
  checkoutInfo: { items: number; total: number };
}) {
  return (
    <Dialog modal open={showSuccessDialog}>
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
          enterStyle={{ opacity: 0, scale: 0.9 }}
          exitStyle={{ opacity: 0, scale: 0.95 }}
          bordered
          elevate
          borderRadius={24}
          width="85%"
          maxWidth={360}
          backgroundColor="white"
          padding="$5"
        >
          <YStack alignItems="center" gap="$4">
            {/* 成功圖示 */}
            <View
              width={100}
              height={100}
              borderRadius={50}
              backgroundColor="#D1FAE5"
              justifyContent="center"
              alignItems="center"
            >
              <CheckCircle size={60} color="#059669" strokeWidth={3} />
            </View>

            {/* 標題 */}
            <Text fontSize="$8" fontWeight="800" color={YCM_COLORS.dark}>
              訂單完成！
            </Text>

            {/* 訊息 */}
            <YStack alignItems="center" gap="$2">
              <Text fontSize="$4" color="$gray11" textAlign="center">
                您的訂單已成功送出
              </Text>
              <Text fontSize="$3" color="$gray10" textAlign="center">
                感謝您的購買！
              </Text>
            </YStack>

            {/* 訂單資訊 */}
            <View
              width="100%"
              padding="$3"
              borderRadius={12}
              backgroundColor="$gray2"
            >
              <XStack justifyContent="space-between" marginBottom="$2">
                <Text fontSize="$3" color="$gray10">
                  商品數量
                </Text>
                <Text fontSize="$3" fontWeight="600" color={YCM_COLORS.dark}>
                  {checkoutInfo.items} 件
                </Text>
              </XStack>

              <XStack justifyContent="space-between">
                <Text fontSize="$4" fontWeight="700" color={YCM_COLORS.dark}>
                  訂單金額
                </Text>
                <Text fontSize="$5" fontWeight="800" color={YCM_COLORS.primary}>
                  ${checkoutInfo.total.toFixed(0)}
                </Text>
              </XStack>
            </View>

            {/* 自動關閉提示 */}
            <Text fontSize="$2" color="$gray9" textAlign="center">
              視窗將在 3 秒後自動關閉
            </Text>
          </YStack>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog>
  );
}
