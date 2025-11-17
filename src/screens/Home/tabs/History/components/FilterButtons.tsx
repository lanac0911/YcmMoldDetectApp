import { XStack, Button, Text } from 'tamagui';
import { Heart } from '@tamagui/lucide-icons';

interface Props {
  showFavoritesOnly: boolean;
  total: number;
  favCount: number;
  onToggle: (fav: boolean) => void;
}

export function FilterButtons({
  showFavoritesOnly,
  total,
  favCount,
  onToggle,
}: Props) {
  return (
    <XStack gap="$2" mb="$2">
      <Button
        flex={1}
        size="$3"
        bg={!showFavoritesOnly ? '$green8' : '$gray4'}
        onPress={() => onToggle(false)}
      >
        <Text
          color={!showFavoritesOnly ? 'white' : '$gray10'}
          fontWeight="bold"
        >
          全部 ({total})
        </Text>
      </Button>

      <Button
        flex={1}
        size="$3"
        bg={showFavoritesOnly ? '$green8' : '$gray4'}
        icon={
          <Heart size={16} color={showFavoritesOnly ? 'white' : '$gray10'} />
        }
        onPress={() => onToggle(true)}
      >
        <Text color={showFavoritesOnly ? 'white' : '$gray10'} fontWeight="bold">
          我的最愛 ({favCount})
        </Text>
      </Button>
    </XStack>
  );
}
