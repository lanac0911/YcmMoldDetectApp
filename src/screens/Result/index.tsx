import React from 'react';
import { View, Text, Button, YStack, XStack, ScrollView, Image } from 'tamagui';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@navigation/AppNavigator';
import {
  AlertCircle,
  CheckCircle,
  ShoppingCart,
  Plus,
} from '@tamagui/lucide-icons';
import { Pressable } from 'react-native';

type Props = NativeStackScreenProps<RootStackParamList, 'Result'>;

// 模擬商品資料
const MOCK_PRODUCTS = [
  {
    id: 1,
    name: '防霉清潔劑',
    price: 299,
    image: 'https://via.placeholder.com/150',
    rating: 4.5,
  },
  {
    id: 2,
    name: '除霉噴霧',
    price: 399,
    image: 'https://via.placeholder.com/150',
    rating: 4.8,
  },
  {
    id: 3,
    name: '防潮除濕盒',
    price: 199,
    image: 'https://via.placeholder.com/150',
    rating: 4.3,
  },
];

export default function Result({ navigation, route }: Props) {
  const { imageUri, isMoldy = false, confidence = 0 } = route.params;

  const handleAddToCart = (productId: number) => {
    console.log('Add to cart:', productId);
    // TODO
  };

  const handleBackToHome = () => {
    navigation.navigate('Home');
  };

  return (
    <View>
      <ScrollView flex={1}>
        <YStack padding="$4" gap="$4">
          {/* Result Header */}
          <YStack gap="$3">
            <Text fontSize="$8" fontWeight="bold" color="$color">
              檢測結果
            </Text>

            {/* Image Preview */}
            <View
              width="100%"
              height={250}
              borderRadius="$4"
              overflow="hidden"
              backgroundColor="$gray3"
            >
              <Image
                source={{ uri: imageUri }}
                style={{ width: '100%', height: '100%' }}
                resizeMode="cover"
              />
            </View>

            {/* Card：檢測結果 */}
            <View
              padding="$4"
              borderRadius="$4"
              backgroundColor={isMoldy ? '$red3' : '$green3'}
              borderWidth={2}
              borderColor={isMoldy ? '$red8' : '$green8'}
            >
              <XStack alignItems="center" gap="$3">
                {isMoldy ? (
                  <AlertCircle size={32} color="$red10" />
                ) : (
                  <CheckCircle size={32} color="$green10" />
                )}
                <YStack flex={1}>
                  <Text
                    fontSize="$7"
                    fontWeight="bold"
                    color={isMoldy ? '$red11' : '$green11'}
                  >
                    {isMoldy ? '檢測到發霉' : '未檢測到發霉'}
                  </Text>
                  <Text fontSize="$4" color={isMoldy ? '$red10' : '$green10'}>
                    信心度: {confidence.toFixed(1)}%
                  </Text>
                </YStack>
              </XStack>

              {isMoldy && (
                <Text
                  fontSize="$3"
                  color="$red11"
                  marginTop="$3"
                  lineHeight="$3"
                >
                  建議盡快清潔處理，避免擴散影響健康
                </Text>
              )}
            </View>
          </YStack>

          {/* TODO：商品列表 */}
          {isMoldy && (
            <YStack gap="$3" marginTop="$2">
              <XStack justifyContent="space-between" alignItems="center">
                <Text fontSize="$7" fontWeight="bold" color="$color">
                  推薦商品
                </Text>
                <Text fontSize="$3" color="$gray10">
                  幫助您解決發霉問題
                </Text>
              </XStack>

              {/* 商品 Card */}
              <YStack gap="$3">
                {MOCK_PRODUCTS.map(product => (
                  <View
                    key={product.id}
                    padding="$4"
                    borderRadius="$4"
                    backgroundColor="$gray2"
                    borderWidth={1}
                    borderColor="$gray5"
                  >
                    <XStack gap="$3">
                      {/* 示意圖 */}
                      <View
                        width={80}
                        height={80}
                        borderRadius="$3"
                        overflow="hidden"
                        backgroundColor="$gray4"
                      >
                        <Image
                          source={{ uri: product.image }}
                          style={{ width: '100%', height: '100%' }}
                          resizeMode="cover"
                        />
                      </View>

                      {/* 產品資訊 */}
                      <YStack flex={1} justifyContent="space-between">
                        <YStack>
                          <Text fontSize="$5" fontWeight="600" color="$color">
                            {product.name}
                          </Text>
                          <Text fontSize="$3" color="$gray10" marginTop="$1">
                            ⭐ {product.rating}
                          </Text>
                        </YStack>
                        <XStack
                          justifyContent="space-between"
                          alignItems="center"
                        >
                          <Text fontSize="$6" fontWeight="bold" color="$red10">
                            NT$ {product.price}
                          </Text>
                          <Pressable
                            onPress={() => handleAddToCart(product.id)}
                          >
                            <View
                              paddingHorizontal="$3"
                              paddingVertical="$2"
                              borderRadius="$3"
                              backgroundColor="$blue10"
                              flexDirection="row"
                              alignItems="center"
                              gap="$2"
                            >
                              <Plus size={16} color="white" />
                              <Text
                                color="white"
                                fontSize="$3"
                                fontWeight="600"
                              >
                                加入購物車
                              </Text>
                            </View>
                          </Pressable>
                        </XStack>
                      </YStack>
                    </XStack>
                  </View>
                ))}
              </YStack>
            </YStack>
          )}

          {/* Btns */}
          <YStack gap="$3" marginTop="$4" marginBottom="$6">
            <Button
              size="$5"
              backgroundColor="$blue10"
              pressStyle={{ opacity: 0.8, scale: 0.98 }}
              onPress={() => navigation.navigate('Camera')}
            >
              <Text color="white" fontSize="$5" fontWeight="600">
                再次檢測
              </Text>
            </Button>
            <Button
              size="$5"
              backgroundColor="$gray8"
              pressStyle={{ opacity: 0.8, scale: 0.98 }}
              onPress={handleBackToHome}
            >
              <Text color="white" fontSize="$5">
                返回首頁
              </Text>
            </Button>
          </YStack>
        </YStack>
      </ScrollView>

      {/* 購物車 Fab Button */}
      <Pressable
        style={{
          position: 'absolute',
          bottom: 30,
          right: 20,
        }}
        onPress={() => navigation.navigate('Cart')}
      >
        <View
          width={60}
          height={60}
          borderRadius={30}
          backgroundColor="$green10"
          justifyContent="center"
          alignItems="center"
          shadowColor="$shadowColor"
          shadowOffset={{ width: 0, height: 4 }}
          shadowOpacity={0.3}
          shadowRadius={8}
        >
          <ShoppingCart size={28} color="white" />
        </View>
      </Pressable>
    </View>
  );
}
