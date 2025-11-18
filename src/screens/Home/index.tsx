// src/screens/Home/Home.tsx
import React, { useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, Pressable } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@navigation/AppNavigator';
import { YStack, View, Text, XStack } from 'tamagui';
import { Camera, History, ShoppingCart } from '@tamagui/lucide-icons';
import SafeArea from '@components/SafeArea';
import { YCM_COLORS } from '@styles/imgs/themes';
import DetectionTab from './tabs/Camera/DetectionTab';
import HistoryTab from './tabs/History/HistoryTab';
import { useCartStore } from '@store/cartStore';
import CartModal from './components/CartModal';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function Home({ navigation, route }: Props) {
  const [currentTab, setCurrentTab] = useState<'detection' | 'history'>(
    'detection',
  );
  const [isCartOpen, setIsCartOpen] = useState(false);

  // 購物車數量
  const { getTotalItems } = useCartStore();
  const totalItems = getTotalItems();

  // 監聽：是否打開購物車
  useEffect(() => {
    if (route.params?.openCart) {
      setIsCartOpen(true);
      navigation.setParams({ openCart: undefined });
    }
  }, [route.params?.openCart, navigation]);

  return (
    <SafeArea>
      <YStack flex={1} backgroundColor="$background">
        {/* 頁面標題 */}
        <YStack
          backgroundColor="white"
          paddingHorizontal="$5"
          paddingTop="$4"
          paddingBottom="$3"
          borderBottomWidth={1}
          borderBottomColor="$gray4"
        >
          <Text fontSize="$8" fontWeight="bold" color={YCM_COLORS.dark}>
            發霉檢測
          </Text>
          <Text fontSize="$3" color="$gray10" marginTop="$1">
            智能辨識 · 守護健康
          </Text>
        </YStack>

        {/* Tab 列表 */}
        <YStack
          backgroundColor="white"
          paddingHorizontal="$4"
          paddingVertical="$3"
          borderBottomWidth={1}
          borderBottomColor="$gray4"
        >
          <XStack
            backgroundColor="$gray3"
            borderRadius={12}
            padding="$1"
            gap="$1"
          >
            {/* 檢測 Tab */}
            <TouchableOpacity
              style={{ flex: 1 }}
              activeOpacity={0.7}
              onPress={() => setCurrentTab('detection')}
            >
              <View
                backgroundColor={
                  currentTab === 'detection' ? 'white' : 'transparent'
                }
                borderRadius={10}
                paddingVertical="$3"
              >
                <XStack alignItems="center" justifyContent="center" gap="$2">
                  <Camera
                    size={20}
                    color={
                      currentTab === 'detection' ? YCM_COLORS.primary : '#999'
                    }
                  />
                  <Text
                    fontSize="$4"
                    fontWeight={currentTab === 'detection' ? '700' : '500'}
                    color={
                      currentTab === 'detection'
                        ? YCM_COLORS.primary
                        : '$gray10'
                    }
                  >
                    檢測
                  </Text>
                </XStack>
              </View>
            </TouchableOpacity>

            {/* 歷史紀錄 Tab */}
            <TouchableOpacity
              style={{ flex: 1 }}
              activeOpacity={0.7}
              onPress={() => setCurrentTab('history')}
            >
              <View
                backgroundColor={
                  currentTab === 'history' ? 'white' : 'transparent'
                }
                borderRadius={10}
                paddingVertical="$3"
              >
                <XStack alignItems="center" justifyContent="center" gap="$2">
                  <History
                    size={20}
                    color={
                      currentTab === 'history' ? YCM_COLORS.primary : '#999'
                    }
                  />
                  <Text
                    fontSize="$4"
                    fontWeight={currentTab === 'history' ? '700' : '500'}
                    color={
                      currentTab === 'history' ? YCM_COLORS.primary : '$gray10'
                    }
                  >
                    歷史紀錄
                  </Text>
                </XStack>
              </View>
            </TouchableOpacity>
          </XStack>
        </YStack>

        {/* Tab 內容 */}
        <YStack flex={1}>
          {currentTab === 'detection' ? (
            <DetectionTab navigation={navigation} />
          ) : (
            <HistoryTab navigation={navigation} />
          )}
        </YStack>

        {/* 購物車 FAB */}
        <Pressable
          style={styles.floatButton}
          onPress={() => setIsCartOpen(true)}
        >
          <View
            width={64}
            height={64}
            borderRadius={32}
            backgroundColor={YCM_COLORS.primary}
            justifyContent="center"
            alignItems="center"
            shadowColor="#000"
            shadowOffset={{ width: 0, height: 6 }}
            shadowOpacity={0.25}
            shadowRadius={12}
          >
            <ShoppingCart size={30} color="white" strokeWidth={2.5} />
            {/* 購物車數量徽章 */}
            {totalItems > 0 && (
              <View
                position="absolute"
                top={-2}
                right={-2}
                minWidth={22}
                height={22}
                paddingHorizontal="$1.5"
                borderRadius={11}
                backgroundColor="$red10"
                justifyContent="center"
                alignItems="center"
                borderWidth={2}
                borderColor="white"
              >
                <Text fontSize={11} fontWeight="bold" color="white">
                  {totalItems > 99 ? '99+' : totalItems}
                </Text>
              </View>
            )}
          </View>
        </Pressable>

        {/* 購物車 Modal */}
        <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      </YStack>
    </SafeArea>
  );
}

const styles = StyleSheet.create({
  floatButton: {
    position: 'absolute',
    bottom: 32,
    right: 24,
    zIndex: 999,
  },
});
