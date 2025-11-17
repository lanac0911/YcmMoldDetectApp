import React, { useState } from 'react';
import { Alert, FlatList } from 'react-native';
import { YStack, Text } from 'tamagui';

import {
  useDetectionHistory,
  DetectionRecord,
} from '@store/detectionHistoryStore';

import { HistoryEmpty } from './components/HistoryEmpty';
import { FilterButtons } from './components/FilterButtons';
import { HistoryCard } from './components/HistoryCard';
import { RecordDetailDialog } from './components/RecordDetailDialog';
import { formatDate, formatFullDate } from '@utils/date';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from 'navigation/AppNavigator';

type HistoryTabProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Home'>;
};

export default function HistoryTab({ navigation }: HistoryTabProps) {
  const { records, toggleFavorite, removeRecord } = useDetectionHistory();

  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<DetectionRecord | null>(
    null,
  );

  const displayRecords = showFavoritesOnly
    ? records.filter(r => r.isFavorite)
    : records;

  const handleRecordPress = (record: DetectionRecord) => {
    setSelectedRecord(record);
  };

  const handleToggleFavoriteInDialog = () => {
    if (selectedRecord) toggleFavorite(selectedRecord.id);
  };

  const handleDeleteInDialog = () => {
    if (!selectedRecord) return;

    Alert.alert('確認刪除', '確定要刪除這筆記錄嗎？', [
      { text: '取消', style: 'cancel' },
      {
        text: '刪除',
        style: 'destructive',
        onPress: () => {
          removeRecord(selectedRecord.id);
          setSelectedRecord(null);
        },
      },
    ]);
  };

  const currentRecord = selectedRecord
    ? records.find(r => r.id === selectedRecord.id)
    : null;

  // 沒有任何紀錄
  if (!showFavoritesOnly && records.length === 0) {
    return <HistoryEmpty />;
  }

  // 「收藏頁」沒有紀錄
  if (showFavoritesOnly && displayRecords.length === 0) {
    return (
      <YStack flex={1} backgroundColor="$background">
        <FilterButtons
          showFavoritesOnly={showFavoritesOnly}
          total={records.length}
          favCount={records.filter(r => r.isFavorite).length}
          onToggle={setShowFavoritesOnly}
        />
        <HistoryEmpty isFavorite />
      </YStack>
    );
  }

  return (
    <>
      <YStack flex={1} backgroundColor="$background" px="$4">
        {/* 篩選按鈕 */}
        <FilterButtons
          showFavoritesOnly={showFavoritesOnly}
          total={records.length}
          favCount={records.filter(r => r.isFavorite).length}
          onToggle={setShowFavoritesOnly}
        />

        <FlatList
          data={displayRecords}
          keyExtractor={item => item.id}
          contentContainerStyle={{ paddingBottom: 40 }}
          renderItem={({ item }) => (
            <HistoryCard
              record={item}
              formatDate={formatDate}
              onPress={() => handleRecordPress(item)}
              onToggleFavorite={() => toggleFavorite(item.id)}
            />
          )}
        />
      </YStack>

      {/* Dialog */}
      <RecordDetailDialog
        key={currentRecord?.id}
        record={currentRecord}
        isFavorite={currentRecord?.isFavorite ?? false}
        onClose={() => setSelectedRecord(null)}
        onToggleFavorite={handleToggleFavoriteInDialog}
        onDelete={handleDeleteInDialog}
        formatFullDate={formatFullDate}
      />
    </>
  );
}
