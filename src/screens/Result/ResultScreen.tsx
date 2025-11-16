import React from 'react';
import { Image, StyleSheet, ScrollView } from 'react-native';
import { YStack, XStack, Text, Button, Card, View } from 'tamagui';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@navigation/AppNavigator';
import { ArrowLeft, ShoppingCart } from '@tamagui/lucide-icons';
import SafeArea from '@components/SafeArea';
import { YCM_COLORS } from '@styles/imgs/themes';

type Props = NativeStackScreenProps<RootStackParamList, 'Result'>;

export default function ResultScreen({ route, navigation }: Props) {
  const { imageUri, isMoldy, confidence } = route.params;

  // --- Mock 商品資料 (之後換成 WooCommerce API 回傳資料) ---
  const products = [
    {
      id: 1,
      title: '黴菌清潔噴霧',
      price: 129,
      image:
        'https://images.unsplash.com/photo-1585386959984-a4155223f3a6?w=300',
    },
    {
      id: 2,
      title: '浴室強效除黴劑',
      price: 199,
      image:
        'https://images.unsplash.com/photo-1600369671801-03c8b1cf65dd?w=300',
    },
  ];

  return (
    <SafeArea>
      <YStack flex={1} backgroundColor="$background">
        {/* Header */}
        <XStack
          alignItems="center"
          padding="$4"
          borderBottomWidth={1}
          borderBottomColor="$gray5"
        >
          <Button
            chromeless
            size="$4"
            icon={<ArrowLeft size={24} color="black" />}
            onPress={() => navigation.goBack()}
          />
          <Text
            flex={1}
            textAlign="center"
            fontSize="$6"
            fontWeight="600"
            color={YCM_COLORS.dark}
          >
            分析結果
          </Text>
          <View width={40} />
        </XStack>

        <ScrollView contentContainerStyle={{ paddingBottom: 120 }}>
          {/* 照片預覽 */}
          <YStack padding="$4" alignItems="center">
            <Image
              source={{ uri: imageUri }}
              style={styles.preview}
              resizeMode="contain"
            />
          </YStack>

          {/* AI 分析結果卡片 */}
          <YStack padding="$4">
            <YStack
              padding="$4"
              borderRadius="$4"
              backgroundColor={
                isMoldy ? 'rgba(255,80,80,0.1)' : 'rgba(80,200,120,0.1)'
              }
              borderWidth={2}
              borderColor={isMoldy ? '#ff6b6b' : YCM_COLORS.primary}
              gap="$2"
            >
              <Text
                fontSize="$7"
                fontWeight="700"
                color={isMoldy ? '#d9534f' : YCM_COLORS.primary}
              >
                {isMoldy ? '⚠️ 發現黴菌' : '✅ 未發現黴菌'}
              </Text>

              <Text fontSize="$5" fontWeight="600" color="$color">
                可信度：{Math.round((confidence ?? 0) * 100)}%
              </Text>

              <Text fontSize="$4" color="$gray10" lineHeight={22}>
                {isMoldy
                  ? '建議立即清潔此區域，保持乾燥與良好通風。'
                  : '此區域目前看起來很乾淨，請持續保持良好環境。'}
              </Text>
            </YStack>
          </YStack>

          {/* 商品列表 */}
          <YStack padding="$4" gap="$4">
            <Text fontSize="$6" fontWeight="700" color={YCM_COLORS.dark}>
              推薦商品
            </Text>

            {products.map(p => (
              <Card
                key={p.id}
                elevate
                size="$5"
                bordered
                borderColor="$gray5"
                padding="$3"
              >
                <XStack gap="$3" alignItems="center">
                  <Image source={{ uri: p.image }} style={styles.productImg} />

                  <YStack flex={1} gap="$1">
                    <Text fontSize="$5" fontWeight="600" color="$color">
                      {p.title}
                    </Text>
                    <Text fontSize="$4" color={YCM_COLORS.dark}>
                      ${p.price}
                    </Text>
                  </YStack>

                  <Button
                    size="$3"
                    backgroundColor={YCM_COLORS.primary}
                    pressStyle={{
                      backgroundColor: YCM_COLORS.dark,
                      scale: 0.98,
                    }}
                    onPress={() => console.log('Add to cart:', p.id)}
                  >
                    <Text color="white">加入</Text>
                  </Button>
                </XStack>
              </Card>
            ))}
          </YStack>
        </ScrollView>

        {/* 浮動購物車 FAB */}
        <Button
          position="absolute"
          bottom={30}
          right={20}
          width={60}
          height={60}
          borderRadius={30}
          backgroundColor={YCM_COLORS.primary}
          icon={<ShoppingCart size={28} color="white" />}
          onPress={() => navigation.navigate('Cart')}
        />
      </YStack>
    </SafeArea>
  );
}

const styles = StyleSheet.create({
  preview: {
    width: '100%',
    height: 300,
    borderRadius: 12,
  },
  productImg: {
    width: 70,
    height: 70,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
  },
});
