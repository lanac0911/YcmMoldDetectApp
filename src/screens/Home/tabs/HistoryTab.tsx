import React from 'react';
import { YStack, Text, ScrollView } from 'tamagui';
import { History } from '@tamagui/lucide-icons';

interface HistoryTabProps {
  navigation: any;
}

export default function HistoryTab({ navigation }: HistoryTabProps) {
  return (
    <ScrollView flex={1} backgroundColor="$background">
      <YStack flex={1} justifyContent="center" alignItems="center" padding="$6">
        <History size={80} color="$gray8" />
        <Text fontSize="$6" color="$gray10" marginTop="$4">
          尚無檢測紀錄
        </Text>
        <Text fontSize="$3" color="$gray9" marginTop="$2" textAlign="center">
          開始使用檢測功能，紀錄會顯示在這裡
        </Text>
      </YStack>
    </ScrollView>
  );
}
