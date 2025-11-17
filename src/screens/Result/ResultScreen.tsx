import React, { useEffect, useCallback, useMemo, useState } from 'react';
import { FlatList, Pressable, StyleSheet, Alert } from 'react-native';
import { XStack, Text, View } from 'tamagui';
import { ArrowLeft, Heart } from '@tamagui/lucide-icons';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { RootStackParamList } from '@navigation/AppNavigator';
import { useWooProductsStore } from '@store/wooProductsStore';
import { useCart } from '@utils/useCart';
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

  const { addToCart, cartItems } = useCart();

  // 歷史紀錄
  const { records, addRecord, toggleFavorite } = useDetectionHistory();

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
      addToCart,
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
  }, [recordId, imageUri, isMoldy, confidence, addRecord]);

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
  }, [currentRecordId, isFavorite, toggleFavorite]);

  const handleOnReachEnd = () => {
    if (!loading && hasMoreData) {
      getProducts(nextPage);
    }
  };

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
      </View>
    </SafeArea>
  );
};

export default ResultScreen;

const styles = StyleSheet.create({
  contentContainer: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 100,
  },
});
