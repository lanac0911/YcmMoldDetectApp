import React from 'react';
import { View, Text } from 'tamagui';

const Home = () => {
  return (
    <View
      flex={1}
      alignItems="center"
      justifyContent="center"
      backgroundColor="$yellow10"
    >
      <Text fontSize="$8" color="$color">
        Home Page
      </Text>
    </View>
  );
};

export default Home;
