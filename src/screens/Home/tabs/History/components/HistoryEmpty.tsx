import { YStack, Text } from 'tamagui';
import { History } from '@tamagui/lucide-icons';

export function HistoryEmpty({ isFavorite = false }: { isFavorite?: boolean }) {
  let title = isFavorite ? '尚無收藏記錄' : '尚無檢測紀錄';
  let subtitle = isFavorite
    ? '在檢測結果頁點擊愛心即可加入收藏'
    : '開始使用檢測功能，紀錄將會顯示在這裡';

  return (
    <YStack f={1} ai="center" jc="center" p="$6">
      <History size={80} color="$gray8" />
      <Text fontSize="$6" color="$gray10" mt="$4" fontWeight="bold">
        title
      </Text>
      <Text fontSize="$3" color="$gray9" mt="$2" ta="center">
        subtitle
      </Text>
    </YStack>
  );
}
