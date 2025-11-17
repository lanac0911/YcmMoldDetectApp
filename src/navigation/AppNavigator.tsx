import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Welcome from '@screens/Welcome';
import Result from '@screens/Result/ResultScreen';
import Cart from '@screens/Cart';
import Home from '@screens/Home';
import { DetectionResult } from '@typedef/detection';

export type RootStackParamList = {
  Welcome: undefined;
  Home: { openCart?: boolean } | undefined;
  Camera: undefined;
  Result: DetectionResult;
  Cart: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Welcome"
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right',
        }}
      >
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Result" component={Result} />
        <Stack.Screen
          name="Cart"
          component={Cart}
          options={{
            presentation: 'modal',
            animation: 'slide_from_bottom',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
