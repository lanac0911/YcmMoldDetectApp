import React from 'react';
import { View, Text, XStack, YStack } from 'tamagui';
import { ConfidenceUI } from '@utils/getConfidenceLevel';

interface Props {
  ui: ConfidenceUI;
  confidence: number;
  showSuggestion?: boolean;
  showProgressBar?: boolean;
}

export default function ConfidenceResultCard({
  ui,
  confidence,
  showSuggestion = true,
  showProgressBar = true,
}: Props) {
  const Icon = ui.icon;

  return (
    <View
      padding="$5"
      borderRadius={16}
      backgroundColor={ui.bgColor}
      borderWidth={2}
      borderColor={ui.borderColor}
    >
      {/* Header */}
      <XStack alignItems="center" gap="$3" marginBottom="$3">
        <View
          width={56}
          height={56}
          borderRadius={28}
          backgroundColor="white"
          justifyContent="center"
          alignItems="center"
        >
          <Icon size={36} color={ui.color} />
        </View>

        <YStack flex={1} gap="$2">
          <Text fontSize="$7" fontWeight="bold" color={ui.color}>
            {ui.title}
          </Text>

          <XStack gap="$2">
            <View
              paddingHorizontal="$2.5"
              paddingVertical="$1"
              borderRadius={8}
              backgroundColor="white"
            >
              <Text fontSize="$2" fontWeight="bold" color={ui.color}>
                {ui.description}
              </Text>
            </View>
          </XStack>
        </YStack>
      </XStack>

      {/* 信心度 */}
      {showProgressBar && (
        <YStack gap="$2" marginBottom="$3">
          <XStack justifyContent="space-between">
            <Text fontSize="$3" fontWeight="bold" color={ui.color}>
              AI 信心度
            </Text>
            <Text fontSize="$5" fontWeight="bold" color={ui.color}>
              {confidence}%
            </Text>
          </XStack>

          <View
            width="100%"
            height={8}
            borderRadius={4}
            backgroundColor="white"
            overflow="hidden"
          >
            <View
              width={`${confidence}%`}
              height="100%"
              backgroundColor={ui.color}
              borderRadius={4}
            />
          </View>
        </YStack>
      )}

      {showSuggestion && (
        <>
          <View
            height={1}
            backgroundColor={ui.borderColor}
            marginVertical="$3"
          />
          <Text fontSize="$4" fontWeight="bold" color={ui.color}>
            💡 建議
          </Text>
          <Text fontSize="$3" color={ui.color} lineHeight={20}>
            {ui.suggestion}
          </Text>
        </>
      )}
    </View>
  );
}
