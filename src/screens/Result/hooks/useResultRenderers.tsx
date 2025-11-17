import React, { useCallback, useMemo } from 'react';
import { YStack, Text, Button } from 'tamagui';
import { YCM_COLORS } from '@styles/imgs/themes';
import ResultItem from '../components/ResultItem';
import ProductCard from '../components/ProductCard';
import { WooProduct } from '@typedef/productAPI';

interface UseResultRenderersProps {
  imageUri: string;
  isMoldy: boolean;
  confidence: number;
  loading: boolean;
  products: WooProduct[];
  hasMoreData: boolean;
  nextPage: number;
  getProducts: (page: number) => void;
  onSelect: (p: WooProduct) => void;
}

export const useResultRenderers = ({
  imageUri,
  isMoldy,
  confidence,
  loading,
  products,
  hasMoreData,
  nextPage,
  getProducts,
  onSelect,
}: UseResultRenderersProps) => {
  const renderProductItem = useCallback(
    ({ item }: { item: WooProduct }) => (
      <ProductCard item={item} onPress={() => onSelect(item)} />
    ),
    [onSelect],
  );

  const renderFooter = useMemo(() => {
    if (loading && products.length > 0) {
      return (
        <YStack padding="$4" alignItems="center">
          <Text color="$gray10" fontSize="$3">
            載入中...
          </Text>
        </YStack>
      );
    }

    if (hasMoreData) {
      return (
        <YStack padding="$4">
          <Button
            size="$4"
            backgroundColor="$gray6"
            pressStyle={{ opacity: 0.8, scale: 0.98 }}
            onPress={() => getProducts(nextPage)}
          >
            <Text fontSize="$4" fontWeight="600">
              載入更多商品
            </Text>
          </Button>
        </YStack>
      );
    }

    if (products.length > 0) {
      return (
        <YStack padding="$4" alignItems="center">
          <Text color="$gray9" fontSize="$3">
            ─── 已顯示全部商品 ───
          </Text>
        </YStack>
      );
    }

    return null;
  }, [loading, hasMoreData, nextPage, products.length, getProducts]);

  const renderHeader = useMemo(() => {
    return (
      <>
        <ResultItem
          imageUri={imageUri}
          isMoldy={isMoldy}
          loading={loading}
          totalNum={products.length}
          confidence={confidence}
        />

        {isMoldy && products.length > 0 && (
          <YStack gap="$2" marginTop="$4" marginBottom="$3">
            <Text fontSize="$7" fontWeight="700" color={YCM_COLORS.dark}>
              💡 推薦商品
            </Text>
            <Text fontSize="$3" color="$gray10">
              精選 {products.length} 件除霉防霉用品
            </Text>
          </YStack>
        )}
      </>
    );
  }, [imageUri, isMoldy, loading, products.length, confidence]);

  const renderEmpty = useMemo(() => {
    if (loading) {
      return (
        <YStack padding="$8" alignItems="center" gap="$3">
          <Text fontSize="$5" color="$gray10">
            正在載入商品...
          </Text>
        </YStack>
      );
    }

    return (
      <YStack padding="$8" alignItems="center" gap="$3">
        <Text fontSize="$8">📦</Text>
        <Text fontSize="$5" fontWeight="600" color="$gray11">
          暫無推薦商品
        </Text>
        <Text fontSize="$3" color="$gray10" textAlign="center">
          目前沒有相關商品，請稍後再試
        </Text>
      </YStack>
    );
  }, [loading]);

  return {
    renderProductItem,
    renderHeader,
    renderFooter,
    renderEmpty,
  };
};
