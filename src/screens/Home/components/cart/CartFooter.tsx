import React from 'react';
import { YStack, XStack, Text, Button, View } from 'tamagui';
import { YCM_COLORS } from '@styles/imgs/themes';
import { useCartStore } from '@store/cartStore';

export default function CartFooter({
  totalItems,
  totalPrice,
  onCheckout,
}: {
  totalItems: number;
  totalPrice: number;
  onCheckout: () => void;
}) {
  const { clearCart } = useCartStore();

  return (
    <YStack
      backgroundColor="white"
      padding="$4"
      borderTopWidth={1}
      borderTopColor="$gray4"
      gap="$3"
      shadowColor="#000"
      shadowOffset={{ width: 0, height: -2 }}
      shadowOpacity={0.1}
      shadowRadius={8}
      elevation={5}
    >
      {/* 總計 */}
      <YStack padding="$3" borderRadius={12} backgroundColor="$gray2" gap="$2">
        <XStack justifyContent="space-between" alignItems="center">
          <Text fontSize="$3" color="$gray10">
            商品數量
          </Text>
          <Text fontSize="$4" fontWeight="600" color={YCM_COLORS.dark}>
            {totalItems} 件
          </Text>
        </XStack>

        <View height={1} backgroundColor="$gray4" />

        <XStack justifyContent="space-between" alignItems="center">
          <Text fontSize="$5" fontWeight="700" color={YCM_COLORS.dark}>
            總計
          </Text>
          <Text fontSize="$8" fontWeight="800" color={YCM_COLORS.primary}>
            ${totalPrice.toFixed(0)}
          </Text>
        </XStack>
      </YStack>

      {/* 結帳按鈕 */}
      <Button
        size="$5"
        backgroundColor={YCM_COLORS.primary}
        onPress={onCheckout}
        pressStyle={{
          backgroundColor: YCM_COLORS.dark,
          scale: 0.98,
        }}
        mb="$4"
      >
        <Text color="white" fontSize="$5" fontWeight="700">
          確認結帳
        </Text>
      </Button>
    </YStack>
  );
}
