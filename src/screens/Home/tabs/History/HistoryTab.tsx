import React, { useState, useMemo } from 'react';
import { Alert, FlatList } from 'react-native';
import { View, YStack } from 'tamagui';

import {
  useDetectionHistory,
  DetectionRecord,
} from '@store/detectionHistoryStore';

import { HistoryEmpty } from './components/HistoryEmpty';
import { FilterTabs } from './components/FilterTabs';
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

  // 分頁參數
  const pageSize = 5;
  const [page, setPage] = useState(1);

  // Dialog 管理
  const [selectedRecord, setSelectedRecord] = useState<DetectionRecord | null>(
    null,
  );

  // 篩選（全部/收藏）
  const filteredRecords = useMemo(() => {
    return showFavoritesOnly ? records.filter(r => r.isFavorite) : records;
  }, [records, showFavoritesOnly]);

  // 切分頁
  const paginatedRecords = useMemo(() => {
    return filteredRecords.slice(0, page * pageSize);
  }, [filteredRecords, page]);

  // 是否有下一頁
  const hasMore = paginatedRecords.length < filteredRecords.length;

  // 滑到底 → 加載下一頁
  const loadMore = () => {
    if (hasMore) setPage(prev => prev + 1);
  };

  // 點擊 card → 開啟 Dialog
  const handleRecordPress = (record: DetectionRecord) => {
    setSelectedRecord(record);
  };

  // Dialog 收藏
  const handleToggleFavoriteInDialog = () => {
    if (selectedRecord) toggleFavorite(selectedRecord.id);
  };

  // Dialog 刪除
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

          // 刪除後重新調整頁數
          setPage(prev => {
            const maxPage = Math.ceil((filteredRecords.length - 1) / pageSize);
            return Math.max(1, Math.min(prev, maxPage));
          });
        },
      },
    ]);
  };

  // 更新後的 record（收藏切換後重新 sync）
  const currentRecord = selectedRecord
    ? records.find(r => r.id === selectedRecord.id)
    : null;

  // 沒有任何紀錄（全部模式）
  if (!showFavoritesOnly && records.length === 0) {
    return <HistoryEmpty />;
  }

  // 收藏頁沒有紀錄
  if (showFavoritesOnly && filteredRecords.length === 0) {
    return (
      <YStack flex={1} backgroundColor="$background">
        <FilterTabs
          showFavoritesOnly={showFavoritesOnly}
          total={records.length}
          favCount={records.filter(r => r.isFavorite).length}
          onToggle={flag => {
            setShowFavoritesOnly(flag);
            setPage(1);
          }}
        />
        <HistoryEmpty isFavorite />
      </YStack>
    );
  }

  return (
    <View flex={1} backgroundColor="$background">
      <YStack flex={1} backgroundColor="$background" px="$4" mb="$4">
        {/* ▸ 篩選 Tabs */}
        <FilterTabs
          showFavoritesOnly={showFavoritesOnly}
          total={records.length}
          favCount={records.filter(r => r.isFavorite).length}
          onToggle={flag => {
            setShowFavoritesOnly(flag);
            setPage(1);
          }}
        />

        <FlatList
          data={paginatedRecords}
          keyExtractor={item => item.id}
          contentContainerStyle={{
            backgroundColor: '#fff',
            paddingBottom: 40,
          }}
          renderItem={({ item }) => (
            <HistoryCard
              record={item}
              formatDate={formatDate}
              onPress={() => handleRecordPress(item)}
              onToggleFavorite={() => toggleFavorite(item.id)}
            />
          )}
          onEndReachedThreshold={0.2}
          onEndReached={loadMore}
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
    </View>
  );
}
