import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Welcome from '@screens/Welcome';
import Camera from '@screens/Camera';
import Result from '@screens/Result/ResultScreen';
import Cart from '@screens/Cart';

export type RootStackParamList = {
  Welcome: undefined;
  Home: undefined;
  Camera: undefined;
  Result: {
    imageUri: string;
    isMoldy?: boolean;
    confidence?: number;
  };
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
        <Stack.Screen name="Camera" component={Camera} />
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
