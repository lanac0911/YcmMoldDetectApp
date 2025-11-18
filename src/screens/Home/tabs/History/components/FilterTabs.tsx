import React from 'react';
import { Tabs, Text, XStack } from 'tamagui';
import { Heart } from '@tamagui/lucide-icons';
import { YCM_COLORS } from '@styles/imgs/themes';

interface Props {
  showFavoritesOnly: boolean;
  total: number;
  favCount: number;
  onToggle: (flag: boolean) => void;
}

export function FilterTabs({
  showFavoritesOnly,
  total,
  favCount,
  onToggle,
}: Props) {
  return (
    <Tabs
      value={showFavoritesOnly ? 'favorite' : 'all'}
      onValueChange={v => onToggle(v === 'favorite')}
      orientation="horizontal"
      flexDirection="row"
      width="100%"
      my="$3"
    >
      <Tabs.List
        flex={1}
        borderRadius={12}
        backgroundColor="$gray3"
        overflow="hidden"
      >
        {/* 全部 */}
        <Tabs.Tab
          value="all"
          flex={1}
          paddingVertical="$2.5"
          justifyContent="center"
          alignItems="center"
          backgroundColor={
            !showFavoritesOnly ? YCM_COLORS.tabGreen : 'transparent'
          }
        >
          <Text
            fontSize="$4"
            fontWeight="700"
            color={!showFavoritesOnly ? 'white' : '$gray11'}
          >
            全部 ({total})
          </Text>
        </Tabs.Tab>

        {/* 最愛 */}
        <Tabs.Tab
          value="favorite"
          flex={1}
          paddingVertical="$2.5"
          justifyContent="center"
          alignItems="center"
          backgroundColor={
            showFavoritesOnly ? YCM_COLORS.tabGreen : 'transparent'
          }
        >
          <XStack gap="$1" alignItems="center">
            <Heart
              size={16}
              color={showFavoritesOnly ? 'white' : '$gray10'}
              fill={showFavoritesOnly ? 'white' : 'transparent'}
            />
            <Text
              fontSize="$4"
              fontWeight="700"
              color={showFavoritesOnly ? 'white' : '$gray11'}
            >
              我的最愛 ({favCount})
            </Text>
          </XStack>
        </Tabs.Tab>
      </Tabs.List>
    </Tabs>
  );
}
