import React, { memo } from 'react';
import { Image } from 'react-native';
import { YStack, Text, Button } from 'tamagui';
import { Product } from '@types/product';

interface ProductCardProps {
  item: Product;
  addToCart: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = memo(({ item, addToCart }) => {
  const firstImage =
    item.images?.[0]?.src ||
    'https://via.placeholder.com/200x200.png?text=No+Image';

  return (
    <YStack
      backgroundColor="white"
      borderRadius="$4"
      padding="$3"
      marginBottom="$4"
      shadowColor="rgba(0,0,0,0.15)"
      shadowOpacity={0.2}
      shadowRadius={4}
    >
      <YStack flexDirection="row">
        <Image
          source={{ uri: firstImage }}
          style={{ width: 90, height: 90, borderRadius: 8 }}
        />

        <YStack marginLeft="$3" flex={1} justifyContent="space-between">
          <Text fontSize="$6" fontWeight="700" numberOfLines={2}>
            {item.name}
          </Text>

          <Text fontSize="$6" color="$green10" marginTop="$2">
            ${item.price}
          </Text>

          <Button
            size="$3"
            marginTop="$2"
            backgroundColor="$green10"
            color="white"
            onPress={() => addToCart(item)}
          >
            加入購物車
          </Button>
        </YStack>
      </YStack>
    </YStack>
  );
});

export default ProductCard;
