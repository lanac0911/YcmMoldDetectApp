import React from 'react';
import { Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Home from '@screens/Home';

function App() {
  return (
    <SafeAreaProvider>
      <View
        style={{
          flex: 1,
          padding: 20,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text style={{ color: 'red' }}>Hello</Text>
        <Home />
      </View>
    </SafeAreaProvider>
  );
}

export default App;
