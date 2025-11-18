import { YStack, Button, Text, View } from 'tamagui';
import { ShoppingCart } from '@tamagui/lucide-icons';
import { YCM_COLORS } from '@styles/imgs/themes';

interface Props {
  totalItems: number;
  onPress: () => void;
}

export default function ShoppingCartFab({ totalItems, onPress }: Props) {
  return (
    <YStack position="absolute" bottom={32} right={24} zIndex={200}>
      <Button
        width={64}
        height={64}
        borderRadius={32}
        backgroundColor={YCM_COLORS.primary}
        justifyContent="center"
        alignItems="center"
        pressStyle={{ scale: 0.96, backgroundColor: YCM_COLORS.dark }}
        onPress={onPress}
        shadowColor="#000"
        shadowOffset={{ width: 0, height: 6 }}
        shadowOpacity={0.25}
        shadowRadius={12}
      >
        <ShoppingCart size={30} color="white" />

        {/* Badge */}
        {totalItems > 0 && (
          <View
            position="absolute"
            top={-2}
            right={-2}
            minWidth={22}
            height={22}
            px="$1.5"
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
      </Button>
    </YStack>
  );
}
