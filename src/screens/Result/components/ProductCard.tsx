import React, { memo } from 'react';
import { Image, StyleSheet, Pressable } from 'react-native';
import { YStack, XStack, Text, Button, View } from 'tamagui';
import { Plus, Minus } from '@tamagui/lucide-icons';
import { useCartStore } from '@store/cartStore';
import { YCM_COLORS } from '@styles/imgs/themes';
import { WooProduct } from '@typedef/productAPI';

interface ProductCardProps {
  item: WooProduct;
  onPress: () => void;
}

const ProductCard: React.FC<ProductCardProps> = memo(({ item, onPress }) => {
  const { addItem, increaseQuantity, decreaseQuantity, getItemQuantity } =
    useCartStore();

  const quantity = getItemQuantity(item.id);
  const inCart = quantity > 0;

  const firstImage =
    item.images?.[0]?.src ||
    'https://via.placeholder.com/200x200.png?text=No+Image';

  return (
    <Pressable onPress={onPress} style={{ width: '100%' }}>
      <YStack
        backgroundColor="white"
        borderRadius="$4"
        padding="$3"
        marginBottom="$4"
        shadowColor="rgba(0,0,0,0.15)"
        shadowOpacity={0.2}
        shadowRadius={4}
        elevation={2}
      >
        <XStack gap="$3">
          {/* 商品圖片 */}
          <Image source={{ uri: firstImage }} style={styles.productImage} />

          {/* 商品資訊 */}
          <YStack flex={1} justifyContent="space-between">
            <YStack>
              <Text fontSize="$5" fontWeight="bold" numberOfLines={2}>
                {item.name}
              </Text>

              <Text
                fontSize="$6"
                color={YCM_COLORS.primary}
                marginTop="$2"
                fontWeight="800"
              >
                ${item.price}
              </Text>
            </YStack>

            {/* 按鈕 */}
            <View mt="$3">
              {!inCart ? (
                <Button
                  size="$3"
                  backgroundColor={YCM_COLORS.primary}
                  color="white"
                  fontWeight="bold"
                  borderRadius={8}
                  pressStyle={{ scale: 0.98 }}
                  onPress={e => {
                    e.stopPropagation();
                    addItem(item);
                  }}
                >
                  加入購物車
                </Button>
              ) : (
                <XStack
                  alignItems="center"
                  justifyContent="space-between"
                  backgroundColor="$gray2"
                  borderRadius={8}
                  paddingVertical="$1"
                  paddingHorizontal="$1.5"
                  gap="$2"
                  onPress={e => e.stopPropagation()}
                >
                  <Button
                    size="$3"
                    circular
                    backgroundColor="white"
                    borderWidth={1}
                    borderColor="$gray4"
                    icon={<Minus size={16} color={YCM_COLORS.primary} />}
                    pressStyle={{
                      backgroundColor: '$gray3',
                      scale: 0.95,
                    }}
                    onPress={e => {
                      e.stopPropagation();
                      decreaseQuantity(item.id);
                    }}
                  />

                  <Text
                    fontSize="$5"
                    fontWeight="bold"
                    color={YCM_COLORS.dark}
                    minWidth={32}
                    textAlign="center"
                  >
                    {quantity}
                  </Text>

                  <Button
                    size="$3"
                    circular
                    backgroundColor={YCM_COLORS.primary}
                    icon={<Plus size={16} color="white" />}
                    pressStyle={{
                      backgroundColor: YCM_COLORS.dark,
                      scale: 0.95,
                    }}
                    onPress={e => {
                      e.stopPropagation();
                      increaseQuantity(item.id);
                    }}
                  />
                </XStack>
              )}
            </View>
          </YStack>
        </XStack>
      </YStack>
    </Pressable>
  );
});

export default ProductCard;

const styles = StyleSheet.create({
  productImage: {
    width: 90,
    height: 90,
    borderRadius: 8,
  },
});
