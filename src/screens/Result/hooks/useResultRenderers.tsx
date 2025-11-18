/*******************************************************************
 * 封裝 ResultScreen 會用到的 Header / Footer / Empty 渲染邏輯
 ******************************************************************/

import React, { useMemo } from 'react';
import { YStack, Text, Button, View, Image } from 'tamagui';
import { getConfidenceLevel } from '@utils/getConfidenceLevel';
import { WooProduct } from '@typedef/productAPI';
import ConfidenceResultCard from '@components/ConfidenceResultCard';
import { StyleSheet } from 'react-native';
import { YCM_COLORS } from '@styles/imgs/themes';

interface UseResultRenderersProps {
  imageUri: string;
  isMoldy: boolean;
  confidence: number;
  loading: boolean;
  products: WooProduct[];
  hasMoreData: boolean;
  nextPage: number;
  getProducts: (page: number) => void;
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
}: UseResultRenderersProps) => {
  const ui = getConfidenceLevel(confidence, isMoldy);

  // FlatList 的 Header
  const renderHeader = useMemo(() => {
    return (
      <View>
        <Image source={{ uri: imageUri }} style={styles.image} />

        <ConfidenceResultCard
          ui={ui}
          confidence={confidence}
          showProgressBar
          showSuggestion
        />
        {/* 推薦商品標題 */}
        {products.length > 0 && (
          <YStack gap="$2" marginTop="$5" marginBottom="$3">
            <Text fontSize="$7" fontWeight="bold" color={YCM_COLORS.dark}>
              🛡️ 除霉商品推薦
            </Text>
            <Text fontSize="$3" color="$gray10">
              精選 {products.length} 件優質商品
            </Text>
          </YStack>
        )}
      </View>
    );
  }, [imageUri, ui, confidence, products.length]);

  // FlatList 的 Footer
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
            <Text fontSize="$4" fontWeight="bold">
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

  // FlatList 為空時
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
        <Text fontSize="$5" fontWeight="bold" color="$gray11">
          暫無推薦商品
        </Text>
        <Text fontSize="$3" color="$gray10" textAlign="center">
          目前沒有相關商品，請稍後再試
        </Text>
      </YStack>
    );
  }, [loading]);

  return {
    renderHeader,
    renderFooter,
    renderEmpty,
  };
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 260,
    borderRadius: 16,
    marginBottom: 16,
  },
});
