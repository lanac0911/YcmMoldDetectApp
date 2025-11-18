import React from 'react';
import { View, Text } from 'tamagui';

export default function Cart() {
  return (
    <View
      flex={1}
      alignItems="center"
      justifyContent="center"
      backgroundColor="$yellow10"
    >
      <Text fontSize="$8" color="$color">
        Cart Page
      </Text>
    </View>
  );
}
