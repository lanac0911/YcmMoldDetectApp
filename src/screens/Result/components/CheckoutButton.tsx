import React from 'react';
import { XStack, YStack, Text, Button } from 'tamagui';
import { ShoppingCart } from '@tamagui/lucide-icons';

import { YCM_COLORS } from '@styles/imgs/themes';

interface CheckoutButtonProps {
  totalItems: number;
  totalPrice: number;
  handleCheckout: () => void;
}
export default function CheckoutButton({
  totalItems,
  totalPrice,
  handleCheckout,
}: CheckoutButtonProps) {
  return (
    <YStack
      backgroundColor="white"
      paddingHorizontal="$4"
      paddingVertical="$3"
      borderTopWidth={1}
      borderTopColor="$gray4"
      shadowColor="#000"
      shadowOffset={{ width: 0, height: -2 }}
      shadowOpacity={0.1}
      shadowRadius={8}
      elevation={5}
    >
      <XStack
        justifyContent="space-between"
        alignItems="center"
        marginBottom="$2"
      >
        <YStack>
          <Text fontSize="$2" color="$gray10">
            已選 {totalItems} 件商品
          </Text>
          <XStack alignItems="baseline" gap="$1" marginTop="$1">
            <Text fontSize="$2" color="$gray9">
              合計
            </Text>
            <Text fontSize="$8" fontWeight="bold" color={YCM_COLORS.primary}>
              ${totalPrice.toFixed(0)}
            </Text>
          </XStack>
        </YStack>

        <Button
          size="$5"
          backgroundColor={YCM_COLORS.primary}
          paddingHorizontal="$6"
          borderRadius={12}
          pressStyle={{
            backgroundColor: YCM_COLORS.dark,
            scale: 0.98,
          }}
          onPress={handleCheckout}
          icon={<ShoppingCart size={20} color="white" />}
        >
          <Text color="white" fontSize="$5" fontWeight="bold">
            結帳
          </Text>
        </Button>
      </XStack>
    </YStack>
  );
}
