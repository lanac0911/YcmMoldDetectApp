import React, { useEffect, useCallback, useMemo } from 'react';
import { Image, FlatList } from 'react-native';
import { YStack, Text, Button } from 'tamagui';
import { useWooProductsStore } from '@store/wooProductsStore';
import { useCart } from '@utils/useCart';
import ResultItem from './ResultItem';
import ProductCard from './ProductCard';
import { Product } from '@types/product';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '@navigation/AppNavigator';

type ResultScreenRouteProp = RouteProp<RootStackParamList, 'Result'>;

const ResultScreen = ({ route }: { route: ResultScreenRouteProp }) => {
  const { imageUri, isMoldy, confidence } = route.params;

  const {
    products,
    loading,
    refreshProducts,
    getProducts,
    nextPage,
    hasMoreData,
  } = useWooProductsStore();

  const { addToCart } = useCart();

  useEffect(() => {
    refreshProducts();
  }, []);

  const renderProductItem = useCallback(
    ({ item }: { item: Product }) => {
      return <ProductCard item={item} addToCart={addToCart} />;
    },
    [addToCart],
  );

  // 個情況的 Footer
  const renderFooter = useMemo(() => {
    if (loading) {
      return (
        <Text textAlign="center" marginTop="$2" color="$gray10">
          載入中...
        </Text>
      );
    }

    if (hasMoreData) {
      return (
        <Button
          marginTop="$3"
          size="$4"
          backgroundColor="$gray6"
          onPress={() => getProducts(nextPage)}
        >
          載入更多
        </Button>
      );
    }

    return (
      <Text textAlign="center" marginTop="$3" color="$gray10">
        已無更多商品
      </Text>
    );
  }, [loading, hasMoreData, nextPage]);

  return (
    <FlatList
      style={{ flex: 1 }}
      contentContainerStyle={{ paddingBottom: 50, paddingHorizontal: 20 }}
      ListHeaderComponent={
        <ResultItem
          imageUri={imageUri}
          isMoldy={isMoldy}
          loading={loading}
          totalNum={products.length}
          confidence={confidence}
        />
      }
      data={products}
      renderItem={renderProductItem}
      keyExtractor={item => item.id.toString()}
      ListFooterComponent={renderFooter}
    />
  );
};

export default ResultScreen;
