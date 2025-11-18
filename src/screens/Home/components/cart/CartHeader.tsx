import { XStack, Text, View, Button } from 'tamagui';
import { X, ShoppingBag } from '@tamagui/lucide-icons';
import { YCM_COLORS } from '@styles/imgs/themes';

export default function CartHeader({
  totalItems,
  onClose,
}: {
  totalItems: number;
  onClose: () => void;
}) {
  return (
    <XStack
      justifyContent="space-between"
      alignItems="center"
      padding="$4"
      backgroundColor="white"
      borderBottomWidth={1}
      borderBottomColor="$gray4"
    >
      <XStack alignItems="center" gap="$2">
        <ShoppingBag size={24} color={YCM_COLORS.primary} />
        <Text fontSize="$7" fontWeight="700" color={YCM_COLORS.dark}>
          購物車
        </Text>
        {totalItems > 0 && (
          <View
            paddingHorizontal="$2.5"
            paddingVertical="$0.5"
            borderRadius={12}
            backgroundColor={YCM_COLORS.primary}
          >
            <Text fontSize="$2" fontWeight="700" color="white">
              {totalItems}
            </Text>
          </View>
        )}
      </XStack>

      <Button
        circular
        size="$3"
        backgroundColor="$gray3"
        onPress={onClose}
        pressStyle={{ backgroundColor: '$gray4', scale: 0.95 }}
      >
        <X size={20} color="$gray10" />
      </Button>
    </XStack>
  );
}
