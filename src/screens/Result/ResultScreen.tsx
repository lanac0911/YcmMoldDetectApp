import React, { useEffect, useCallback, useMemo, useState } from 'react';
import { FlatList, Pressable, StyleSheet } from 'react-native';
import { XStack, YStack, Text, View, Button } from 'tamagui';
import { ArrowLeft, Heart, ShoppingCart } from '@tamagui/lucide-icons';
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
import { YCM_COLORS } from '@styles/imgs/themes';
import { useResultRenderers } from './hooks/useResultRenderers';

type ResultScreenRouteProp = RouteProp<RootStackParamList, 'Result'>;
type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const ResultScreen = ({ route }: { route: ResultScreenRouteProp }) => {
  const { imageUri, isMoldy, confidence, recordId } = route.params;
  const navigation = useNavigation<NavigationProp>();

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
      console.log('🧹 Clearing cart on Result page');
      clearCart();
    }, [clearCart]),
  );

  // render func
  const { renderProductItem, renderHeader, renderFooter, renderEmpty } =
    useResultRenderers({
      imageUri,
      isMoldy,
      confidence,
      loading,
      products,
      hasMoreData,
      nextPage,
      getProducts,
    });

  // 加入 recordId
  const [currentRecordId, setCurrentRecordId] = useState<string | null>(
    recordId ?? null,
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
  }, [recordId, imageUri, isMoldy, confidence, addRecord, refreshProducts]);

  const currentRecord = useMemo(() => {
    return records.find(r => r.id === currentRecordId) ?? null;
  }, [currentRecordId, records]);

  const isFavorite = currentRecord?.isFavorite ?? false;

  // 返回
  const handleGoBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  // 收藏
  const handleToggleFavorite = useCallback(() => {
    if (!currentRecordId) return;
    toggleFavorite(currentRecordId);
  }, [currentRecordId, toggleFavorite]);

  const handleOnReachEnd = () => {
    if (!loading && hasMoreData) {
      getProducts(nextPage);
    }
  };

  // 結帳：回 Home＆打開購物車
  const handleCheckout = useCallback(() => {
    // 導航到 Home，並傳遞參數告訴要打開購物車
    navigation.navigate('Home', { openCart: true });
  }, [navigation]);

  return (
    <SafeArea>
      <View flex={1} backgroundColor="$background">
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

          <Text fontSize="$6" fontWeight="700" color={YCM_COLORS.dark}>
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
                strokeWidth={2}
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
          renderItem={renderProductItem}
          keyExtractor={item => item.id.toString()}
          ListFooterComponent={renderFooter}
          ListEmptyComponent={renderEmpty}
          showsVerticalScrollIndicator={false}
          onEndReached={handleOnReachEnd}
          onEndReachedThreshold={0.3}
        />

        {/* 結帳按鈕 (fix) */}
        {totalItems > 0 && (
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
                  <Text
                    fontSize="$8"
                    fontWeight="800"
                    color={YCM_COLORS.primary}
                  >
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
                <Text color="white" fontSize="$5" fontWeight="700">
                  結帳
                </Text>
              </Button>
            </XStack>
          </YStack>
        )}
      </View>
    </SafeArea>
  );
};

export default ResultScreen;

const styles = StyleSheet.create({
  contentContainer: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 20,
  },
});
