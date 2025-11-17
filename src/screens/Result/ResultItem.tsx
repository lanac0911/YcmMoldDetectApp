import React from 'react';
import { Image } from 'react-native';
import { YStack, Text } from 'tamagui';

interface ResultItemProps {
  imageUri: string | undefined;
  isMoldy: boolean | undefined;
  loading: boolean;
  totalNum: number;
  confidence: number | undefined;
}

const ResultItem: React.FC<ResultItemProps> = React.memo(
  ({ imageUri, isMoldy, loading, totalNum, confidence }) => {
    // 防呆
    const safeUri =
      imageUri ?? 'https://via.placeholder.com/300x300.png?text=No+Image';

    // isMoldy 防呆
    let moldText = '無法判斷';
    if (isMoldy === true) moldText = '偵測到發霉';
    if (isMoldy === false) moldText = '未偵測到發霉';

    // confidence 防呆
    const confidenceText =
      typeof confidence === 'number' ? `${Math.round(confidence * 100)}%` : '-';

    return (
      <YStack padding="$4" alignItems="center">
        <Image
          source={{ uri: safeUri }}
          style={{ width: '100%', height: 260, borderRadius: 16 }}
        />

        <Text fontSize="$8" fontWeight="700" marginTop="$3">
          {moldText}
        </Text>

        <Text fontSize="$5" color="$gray10">
          信心分數：{confidenceText}
        </Text>

        <Text fontSize="$7" fontWeight="700" marginTop="$6" marginBottom="$3">
          推薦商品
        </Text>

        {loading && totalNum === 0 && <Text fontSize="$5">載入中...</Text>}

        {!loading && totalNum === 0 && (
          <Text fontSize="$5" color="$gray10">
            暫無商品
          </Text>
        )}
      </YStack>
    );
  },
);

export default ResultItem;
