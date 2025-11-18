import React, { useEffect, useCallback, useMemo, useState } from 'react';
import { FlatList, Pressable, StyleSheet } from 'react-native';
import { XStack, Text, View } from 'tamagui';
import { ArrowLeft, Heart } from '@tamagui/lucide-icons';
import {
  RouteProp,
  useNavigation,
  useFocusEffect,
} from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { RootStackParamList } from '@navigation/AppNavigator';
import { useWooProductsStore } from '@store/wooProductsStore';
import { useCartStore } from '@store/cartStore';
import { useDetectionHistory } from '@store/detectionHistoryStore';
import SafeArea from '@components/SafeArea';
import ProductCard from './components/ProductCard';
import ProductDetailDialog from './components/ProductDetailDialog';
import CheckoutButton from './components/CheckoutButton';
import { useResultRenderers } from './hooks/useResultRenderers';
import { YCM_COLORS } from '@styles/imgs/themes';
import { WooProduct } from '@typedef/productAPI';

type ResultScreenRouteProp = RouteProp<RootStackParamList, 'Result'>;
type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const Result = ({ route }: { route: ResultScreenRouteProp }) => {
  const { imageUri, isMoldy, confidence, recordId } = route.params;
  const navigation = useNavigation<NavigationProp>();

  // 選的商品資料
  const [selectedProduct, setSelectedProduct] = useState<WooProduct | null>(
    null,
  );
  const [currentRecordId, setCurrentRecordId] = useState<string | null>(
    recordId ?? null,
  );

  // 商品資料
  const {
    products,
    loading,
    refreshProducts,
    getProducts,
    nextPage,
    hasMoreData,
  } = useWooProductsStore();

  // 購物車
  const { getTotalItems, getTotalPrice, clearCart } = useCartStore();
  const totalItems = getTotalItems();
  const totalPrice = getTotalPrice();

  // 歷史紀錄
  const { records, addRecord, toggleFavorite } = useDetectionHistory();

  // 每次進入頁面時清空購物車
  useFocusEffect(
    useCallback(() => {
      clearCart();
    }, [clearCart]),
  );

  // 新增一筆紀錄
  useEffect(() => {
    refreshProducts();

    if (!recordId) {
      const newId = addRecord({ imageUri, isMoldy, confidence });
      setCurrentRecordId(newId);
    } else {
      setCurrentRecordId(recordId);
    }
  }, [imageUri, isMoldy, confidence, recordId, refreshProducts, addRecord]);

  const currentRecord = useMemo(() => {
    return records.find(r => r.id === currentRecordId) ?? null;
  }, [records, currentRecordId]);

  const isFavorite = currentRecord?.isFavorite ?? false;

  const handleToggleFavorite = () => {
    if (!currentRecordId) return;
    toggleFavorite(currentRecordId);
  };

  // 返回
  const handleGoBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);
  const handleCheckout = () => {
    navigation.navigate('Home', { openCart: true });
  };

  // FlatList 的渲染們
  const { renderHeader, renderFooter, renderEmpty } = useResultRenderers({
    imageUri,
    isMoldy,
    confidence,
    loading,
    products,
    hasMoreData,
    nextPage,
    getProducts,
  });

  return (
    <SafeArea>
      <View flex={1}>
        {/* Header Bar */}
        <XStack
          backgroundColor="white"
          paddingHorizontal="$4"
          paddingVertical="$3"
          alignItems="center"
          justifyContent="space-between"
          borderBottomWidth={1}
          borderBottomColor="$gray4"
        >
          {/* Back */}
          <Pressable onPress={handleGoBack}>
            <View
              width={40}
              height={40}
              borderRadius={20}
              backgroundColor="$gray3"
              justifyContent="center"
              alignItems="center"
            >
              <ArrowLeft size={24} color={YCM_COLORS.dark} />
            </View>
          </Pressable>

          <Text fontSize="$6" fontWeight="bold" color={YCM_COLORS.dark}>
            檢測結果
          </Text>

          {/* 收藏按鈕 */}
          <Pressable onPress={handleToggleFavorite}>
            <View
              width={40}
              height={40}
              borderRadius={20}
              backgroundColor={isFavorite ? '#FEE2E2' : '$gray3'}
              justifyContent="center"
              alignItems="center"
            >
              <Heart
                size={22}
                color={isFavorite ? '#EF4444' : '#374151'}
                fill={isFavorite ? '#EF4444' : 'transparent'}
              />
            </View>
          </Pressable>
        </XStack>

        {/* 商品列表 */}
        <FlatList
          style={{ flex: 1 }}
          contentContainerStyle={styles.contentContainer}
          ListHeaderComponent={renderHeader}
          data={products}
          renderItem={({ item }) => (
            <ProductCard item={item} onPress={() => setSelectedProduct(item)} />
          )}
          keyExtractor={item => item.id.toString()}
          ListFooterComponent={renderFooter}
          ListEmptyComponent={renderEmpty}
          onEndReached={() => !loading && hasMoreData && getProducts(nextPage)}
          onEndReachedThreshold={0.3}
        />

        {/* 詳細資訊 Dialog */}
        <ProductDetailDialog
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />

        {/* 結帳按鈕 (fix) */}
        {totalItems > 0 && (
          <CheckoutButton
            totalItems={totalItems}
            totalPrice={totalPrice}
            handleCheckout={handleCheckout}
          />
        )}
      </View>
    </SafeArea>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 20,
  },
});

export default Result;
