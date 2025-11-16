import React from 'react';
import { View, Text } from 'react-native';

const Home = () => {
  return (
    <View
      style={{
        backgroundColor: '#df0',
        width: 300,
        height: 300,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '$4',
      }}
    >
      <Text>Home View</Text>
    </View>
  );
};

export default Home;
