import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { config } from '@tamagui/config/v3';
import { TamaguiProvider, createTamagui } from 'tamagui';
import AppNavigator from '@navigation/AppNavigator';

const tamaguiConfig = createTamagui(config);

type Conf = typeof tamaguiConfig;
declare module '@tamagui/core' {
  interface TamaguiCustomConfig extends Conf {}
}

export default function App() {
  return (
    <SafeAreaProvider>
      <TamaguiProvider config={tamaguiConfig}>
        <AppNavigator />
      </TamaguiProvider>
    </SafeAreaProvider>
  );
}
