import React, { useEffect } from 'react';
import { View, Text } from 'tamagui';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@navigation/AppNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'Welcome'>;

export default function Welcome({ navigation }: Props) {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Home'); // 不讓用戶返回 Welcome
    }, 2500); // 2.5 秒，可改 2000~5000ms

    return () => clearTimeout(timer);
  }, []);

  return (
    <View
      flex={1}
      alignItems="center"
      justifyContent="center"
      backgroundColor="$yellow10"
    >
      <Text fontSize="$8" color="$color">
        Welcome
      </Text>
    </View>
  );
}
