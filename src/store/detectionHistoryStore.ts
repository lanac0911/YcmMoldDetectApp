import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface DetectionRecord {
  id: string;
  imageUri: string;
  isMoldy: boolean;
  confidence: number;
  timestamp: number;
  isFavorite: boolean;
}

interface DetectionHistoryState {
  records: DetectionRecord[];
  addRecord: (
    record: Omit<DetectionRecord, 'id' | 'timestamp' | 'isFavorite'>,
  ) => string; // 返回 ID
  toggleFavorite: (id: string) => void;
  removeRecord: (id: string) => void;
  clearHistory: () => void;
  getFavorites: () => DetectionRecord[];
}

export const useDetectionHistory = create<DetectionHistoryState>()(
  persist(
    (set, get) => ({
      records: [],

      addRecord: record => {
        const newId = Date.now().toString();
        const newRecord: DetectionRecord = {
          ...record,
          id: newId,
          timestamp: Date.now(),
          isFavorite: false,
        };
        set(state => ({
          records: [newRecord, ...state.records],
        }));
        return newId; // 返回新記錄的 ID
      },

      toggleFavorite: id => {
        set(state => ({
          records: state.records.map(record =>
            record.id === id
              ? { ...record, isFavorite: !record.isFavorite }
              : record,
          ),
        }));
      },

      removeRecord: id => {
        set(state => ({
          records: state.records.filter(record => record.id !== id),
        }));
      },

      clearHistory: () => {
        set({ records: [] });
      },

      getFavorites: () => {
        return get().records.filter(record => record.isFavorite);
      },
    }),
    {
      name: 'detection-history',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
