import React, { memo } from 'react';
import { Image, StyleSheet } from 'react-native';
import { YStack, XStack, Text, Button } from 'tamagui';
import { Plus, Minus } from '@tamagui/lucide-icons';
import { Product } from '@types/product';
import { useCartStore } from '@store/cartStore';
import { YCM_COLORS } from '@styles/imgs/themes';

interface ProductCardProps {
  item: Product;
}

const ProductCard: React.FC<ProductCardProps> = memo(({ item }) => {
  const { addItem, increaseQuantity, decreaseQuantity, getItemQuantity } =
    useCartStore();

  const quantity = getItemQuantity(item.id);
  const inCart = quantity > 0;

  const firstImage =
    item.images?.[0]?.src ||
    'https://via.placeholder.com/200x200.png?text=No+Image';

  const handleAddToCart = () => {
    addItem(item);
  };

  const handleIncrease = () => {
    increaseQuantity(item.id);
  };

  const handleDecrease = () => {
    decreaseQuantity(item.id);
  };

  return (
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
            <Text fontSize="$5" fontWeight="700" numberOfLines={2}>
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

          {/* 按鈕區域 */}
          {!inCart ? (
            // 加入購物車按鈕
            <Button
              size="$3"
              backgroundColor={YCM_COLORS.primary}
              color="white"
              fontWeight="700"
              borderRadius={8}
              pressStyle={{
                backgroundColor: YCM_COLORS.dark,
                scale: 0.98,
              }}
              onPress={handleAddToCart}
            >
              加入購物車
            </Button>
          ) : (
            // 數量控制器
            <XStack
              alignItems="center"
              justifyContent="space-between"
              backgroundColor="$gray2"
              borderRadius={8}
              paddingVertical="$1"
              paddingHorizontal="$1.5"
              gap="$2"
            >
              {/* 減少按鈕 */}
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
                onPress={handleDecrease}
              />

              {/* 數量顯示 */}
              <Text
                fontSize="$5"
                fontWeight="700"
                color={YCM_COLORS.dark}
                minWidth={32}
                textAlign="center"
              >
                {quantity}
              </Text>

              {/* 增加按鈕 */}
              <Button
                size="$3"
                circular
                backgroundColor={YCM_COLORS.primary}
                icon={<Plus size={16} color="white" />}
                pressStyle={{
                  backgroundColor: YCM_COLORS.dark,
                  scale: 0.95,
                }}
                onPress={handleIncrease}
              />
            </XStack>
          )}
        </YStack>
      </XStack>
    </YStack>
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
