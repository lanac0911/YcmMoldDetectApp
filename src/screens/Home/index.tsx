import React, { useEffect, useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@navigation/AppNavigator';
import { YStack, Text, View } from 'tamagui';
import SafeArea from '@components/SafeArea';
import HomeTabs from '@navigation/HomeTabs';
import CartModal from './components/CartModal';
import { useCartStore } from '@store/cartStore';
import { YCM_COLORS } from '@styles/imgs/themes';
import ShoppingCartFab from './components/ShoppingCartFab';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function Home({ navigation, route }: Props) {
  const [isCartOpen, setIsCartOpen] = useState(false);

  const { getTotalItems } = useCartStore();
  const totalItems = getTotalItems();

  useEffect(() => {
    if (route.params?.openCart) {
      setIsCartOpen(true);
      navigation.setParams({ openCart: undefined });
    }
  }, [route.params?.openCart]);

  useEffect(() => {
    if (route.params?.goHistory) {
      navigation.setParams({ goHistory: undefined });
    }
  }, [route.params?.goHistory]);

  return (
    <SafeArea>
      <YStack flex={1} bg="$background">
        {/* Header */}
        <YStack
          bg="white"
          px="$5"
          pt="$4"
          pb="$3"
          borderBottomWidth={1}
          borderBottomColor="$gray4"
        >
          <Text fontSize="$8" fontWeight="bold" color={YCM_COLORS.dark}>
            發霉檢測
          </Text>
          <Text fontSize="$3" color="$gray10" mt="$1">
            智能辨識 · 守護健康
          </Text>
        </YStack>

        {/* Bottom Tabs */}
        <HomeTabs goHistory={!!route.params?.goHistory} />

        {/* Cart FAB */}
        <ShoppingCartFab
          totalItems={totalItems}
          onPress={() => setIsCartOpen(true)}
        />

        {/* Cart Modal */}
        <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      </YStack>
    </SafeArea>
  );
}
