import React from 'react';
import {
  YStack,
  XStack,
  Text,
  View,
  Button,
  ScrollView,
  Dialog,
} from 'tamagui';
import { Image, StyleSheet } from 'react-native';
import { X, Trash2, Plus, Minus, ShoppingBag } from '@tamagui/lucide-icons';
import { YCM_COLORS } from '@styles/imgs/themes';
import { CartItem } from '@store/cartStore';

export default function CartContent({
  data,
  increaseQuantity,
  removeItem,
  decreaseQuantity,
}: {
  data: CartItem[];
  increaseQuantity: (productId: number) => void;
  removeItem: (productId: number) => void;
  decreaseQuantity: (productId: number) => void;
}) {
  return (
    <>
      {data.length === 0 ? (
        <YStack
          flex={1}
          justifyContent="center"
          alignItems="center"
          padding="$8"
        >
          <View
            width={120}
            height={120}
            borderRadius={60}
            backgroundColor="$gray3"
            justifyContent="center"
            alignItems="center"
            marginBottom="$4"
          >
            <ShoppingBag size={60} color="$gray8" />
          </View>
          <Text
            fontSize="$6"
            fontWeight="700"
            color="$gray11"
            marginBottom="$2"
          >
            購物車是空的
          </Text>
          <Text fontSize="$3" color="$gray10" textAlign="center">
            快去挑選商品吧！
          </Text>
        </YStack>
      ) : (
        <>
          <ScrollView style={{ flex: 1 }}>
            <YStack padding="$4" gap="$3">
              {data.map(item => {
                const firstImage =
                  item.product.images?.[0]?.src ||
                  'https://via.placeholder.com/80x80.png?text=No+Image';

                return (
                  <YStack
                    key={item.product.id}
                    backgroundColor="white"
                    padding="$3"
                    borderRadius={12}
                    borderWidth={1}
                    borderColor="$gray4"
                    shadowColor="#000"
                    shadowOffset={{ width: 0, height: 1 }}
                    shadowOpacity={0.05}
                    shadowRadius={2}
                    elevation={1}
                  >
                    <XStack gap="$3">
                      {/* 商品圖片 */}
                      <View
                        width={80}
                        height={80}
                        borderRadius={8}
                        overflow="hidden"
                        backgroundColor="$gray2"
                      >
                        <Image
                          source={{ uri: firstImage }}
                          style={styles.productImage}
                          resizeMode="cover"
                        />
                      </View>

                      {/* 商品資訊 */}
                      <YStack flex={1} justifyContent="space-between">
                        <YStack>
                          <Text
                            fontSize="$4"
                            fontWeight="700"
                            color={YCM_COLORS.dark}
                            numberOfLines={2}
                            marginBottom="$1"
                          >
                            {item.product.name}
                          </Text>

                          <Text
                            fontSize="$6"
                            color={YCM_COLORS.primary}
                            fontWeight="800"
                          >
                            ${item.product.price}
                          </Text>
                        </YStack>

                        {/* 數量控制 */}
                        <XStack
                          alignItems="center"
                          justifyContent="space-between"
                          marginTop="$2"
                        >
                          <XStack
                            alignItems="center"
                            backgroundColor="$gray2"
                            borderRadius={8}
                            paddingVertical="$1"
                            paddingHorizontal="$1.5"
                            gap="$2"
                          >
                            <Button
                              size="$2"
                              circular
                              backgroundColor="white"
                              borderWidth={1}
                              borderColor="$gray4"
                              icon={
                                <Minus size={12} color={YCM_COLORS.primary} />
                              }
                              onPress={() => decreaseQuantity(item.product.id)}
                              pressStyle={{ scale: 0.95 }}
                            />

                            <Text
                              fontSize="$4"
                              fontWeight="700"
                              minWidth={28}
                              textAlign="center"
                            >
                              {item.quantity}
                            </Text>

                            <Button
                              size="$2"
                              circular
                              backgroundColor={YCM_COLORS.primary}
                              icon={<Plus size={12} color="white" />}
                              onPress={() => increaseQuantity(item.product.id)}
                              pressStyle={{ scale: 0.95 }}
                            />
                          </XStack>

                          {/* 刪除按鈕 */}
                          <Button
                            circular
                            size="$3"
                            backgroundColor="$red3"
                            icon={<Trash2 size={14} color="$red10" />}
                            onPress={() => removeItem(item.product.id)}
                            pressStyle={{
                              backgroundColor: '$red4',
                              scale: 0.95,
                            }}
                          />
                        </XStack>
                      </YStack>
                    </XStack>

                    {/* 小計 */}
                    <XStack
                      justifyContent="space-between"
                      alignItems="center"
                      marginTop="$2"
                      paddingTop="$2"
                      borderTopWidth={1}
                      borderTopColor="$gray3"
                    >
                      <Text fontSize="$3" color="$gray10">
                        小計
                      </Text>
                      <Text
                        fontSize="$4"
                        fontWeight="700"
                        color={YCM_COLORS.dark}
                      >
                        $
                        {(
                          parseFloat(item.product.price) * item.quantity
                        ).toFixed(0)}
                      </Text>
                    </XStack>
                  </YStack>
                );
              })}
            </YStack>
          </ScrollView>
        </>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  productImage: {
    width: '100%',
    height: '100%',
  },
});
