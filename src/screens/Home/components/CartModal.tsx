import React from 'react';
import { Sheet, YStack, XStack, Text, View, Button, ScrollView } from 'tamagui';
import { X, Trash2, Plus, Minus } from '@tamagui/lucide-icons';
import { useCartStore } from '@store/cartStore';
import { YCM_COLORS } from '@styles/imgs/themes';

interface CartSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartSheet({ isOpen, onClose }: CartSheetProps) {
  const {
    items,
    getTotalItems,
    getTotalPrice,
    increaseQuantity,
    decreaseQuantity,
    removeItem,
    clearCart,
  } = useCartStore();

  const totalItems = getTotalItems();
  const totalPrice = getTotalPrice();

  return (
    <Sheet
      modal
      open={isOpen}
      onOpenChange={(open: boolean) => !open && onClose()}
      snapPoints={[85, 50]}
      dismissOnSnapToBottom
    >
      <Sheet.Overlay
        animation="quick"
        enterStyle={{ opacity: 0 }}
        exitStyle={{ opacity: 0 }}
        backgroundColor="rgba(0,0,0,0.4)"
      />

      <Sheet.Handle />

      <Sheet.Frame padding="$0" backgroundColor="#F5F5F5">
        {/* Header */}
        <XStack
          justifyContent="space-between"
          alignItems="center"
          padding="$4"
          borderBottomWidth={1}
          borderBottomColor="$gray4"
        >
          <Text fontSize="$7" fontWeight="700" color={YCM_COLORS.dark}>
            購物車 ({totalItems})
          </Text>

          <Button circular size="$3" backgroundColor="$gray3" onPress={onClose}>
            <X size={20} color="$gray10" />
          </Button>
        </XStack>

        {/* Content */}
        {items.length === 0 ? (
          <YStack
            flex={1}
            justifyContent="center"
            alignItems="center"
            padding="$6"
          >
            <Text fontSize="$6" color="$gray10">
              購物車是空的
            </Text>
            <Text fontSize="$3" color="$gray9" marginTop="$2">
              快去挑選商品吧！
            </Text>
          </YStack>
        ) : (
          <>
            <ScrollView style={{ flex: 1 }}>
              <YStack padding="$4" gap="$3">
                {items.map(item => (
                  <YStack
                    key={item.product.id}
                    backgroundColor="white"
                    padding="$3"
                    borderRadius={12}
                    borderWidth={1}
                    borderColor="$gray4"
                  >
                    <XStack justifyContent="space-between" alignItems="center">
                      <YStack flex={1}>
                        <Text fontSize="$5" fontWeight="700" numberOfLines={2}>
                          {item.product.name}
                        </Text>

                        <Text
                          fontSize="$6"
                          color={YCM_COLORS.primary}
                          marginTop="$2"
                          fontWeight="800"
                        >
                          ${item.product.price}
                        </Text>
                      </YStack>

                      <Button
                        circular
                        size="$3"
                        backgroundColor="$red3"
                        onPress={() => removeItem(item.product.id)}
                      >
                        <Trash2 size={16} color="$red10" />
                      </Button>
                    </XStack>

                    {/* 數量控制 */}
                    <XStack
                      marginTop="$3"
                      alignItems="center"
                      justifyContent="space-between"
                      backgroundColor="$gray2"
                      borderRadius={8}
                      paddingVertical="$1.5"
                      paddingHorizontal="$2"
                      alignSelf="flex-start"
                    >
                      <Button
                        size="$3"
                        circular
                        backgroundColor="white"
                        borderWidth={1}
                        borderColor="$gray4"
                        icon={<Minus size={14} color={YCM_COLORS.primary} />}
                        onPress={() => decreaseQuantity(item.product.id)}
                      />

                      <Text
                        fontSize="$5"
                        fontWeight="700"
                        marginHorizontal="$4"
                        minWidth={32}
                        textAlign="center"
                      >
                        {item.quantity}
                      </Text>

                      <Button
                        size="$3"
                        circular
                        backgroundColor={YCM_COLORS.primary}
                        icon={<Plus size={14} color="white" />}
                        onPress={() => increaseQuantity(item.product.id)}
                      />
                    </XStack>
                  </YStack>
                ))}
              </YStack>
            </ScrollView>

            {/* Footer */}
            <YStack
              backgroundColor="white"
              padding="$4"
              borderTopWidth={1}
              borderTopColor="$gray4"
              gap="$3"
            >
              <XStack justifyContent="space-between" alignItems="center">
                <Text fontSize="$5" color="$gray11">
                  總計
                </Text>

                <Text fontSize="$8" fontWeight="800" color={YCM_COLORS.primary}>
                  ${totalPrice.toFixed(0)}
                </Text>
              </XStack>

              <Button
                size="$5"
                backgroundColor={YCM_COLORS.primary}
                onPress={() => {
                  onClose();
                }}
              >
                <Text color="white" fontSize="$5" fontWeight="700">
                  確認結帳
                </Text>
              </Button>

              <Button size="$4" backgroundColor="$red4" onPress={clearCart}>
                <Text color="$red11" fontSize="$4" fontWeight="600">
                  清空購物車
                </Text>
              </Button>
            </YStack>
          </>
        )}
      </Sheet.Frame>
    </Sheet>
  );
}
