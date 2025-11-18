import React, { useEffect, useRef } from 'react';
import { StyleSheet, Image, Animated } from 'react-native';
import { YStack, Text, View } from 'tamagui';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@navigation/AppNavigator';
import LinearGradient from 'react-native-linear-gradient';
import SafeArea from '@components/SafeArea';
import YcmLogo from '@styles/imgs/main-logo.png';
import { YCM_COLORS } from '@styles/imgs/themes';

type WelcomeScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Welcome'>;
};

export default function Welcome({ navigation }: WelcomeScreenProps) {
  // 動畫的值
  const scaleAnim = useRef(new Animated.Value(10)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const fadeInAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      // 縮放
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 15,
        friction: 8,
        useNativeDriver: true,
      }),
      // 旋轉
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      // 透明度
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();

    // 文字淡入
    Animated.timing(fadeInAnim, {
      toValue: 1,
      duration: 800,
      delay: 400,
      useNativeDriver: true,
    }).start();

    setTimeout(() => {
      navigation.navigate('Home');
    }, 2500);
  }, [navigation, scaleAnim, rotateAnim, opacityAnim, fadeInAnim]);

  // 旋轉插值
  const rotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['360deg', '0deg'],
  });

  return (
    <LinearGradient
      colors={['#FFFFFF', '#F0F8F0', '#E8F5E8']}
      style={styles.gradient}
    >
      <SafeArea>
        <YStack flex={1} justifyContent="space-between" padding="$6">
          <YStack flex={1} justifyContent="center" alignItems="center" gap="$5">
            <Animated.View
              style={{
                transform: [{ scale: scaleAnim }, { rotate }],
                opacity: opacityAnim,
              }}
            >
              <View
                width={180}
                height={180}
                borderRadius={90}
                backgroundColor={YCM_COLORS.webHeader}
                alignItems="center"
                justifyContent="center"
              >
                <Image
                  source={YcmLogo}
                  style={styles.logo}
                  resizeMode="contain"
                />
              </View>
            </Animated.View>

            <Animated.View
              style={{
                opacity: fadeInAnim,
                transform: [
                  {
                    translateY: fadeInAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [20, 0],
                    }),
                  },
                ],
              }}
            >
              <YStack alignItems="center" gap="$3">
                <Text
                  fontSize="$10"
                  fontWeight="bold"
                  color={YCM_COLORS.dark}
                  textAlign="center"
                >
                  AI 黴菌辨識系統
                </Text>

                <Text
                  fontSize="$5"
                  color={YCM_COLORS.gray}
                  textAlign="center"
                  lineHeight={24}
                >
                  用 AI 技術快速檢測黴菌{'\n'}
                  守護您的居家健康
                </Text>
              </YStack>
            </Animated.View>
          </YStack>

          {/* Fade In */}
          <Animated.View style={{ opacity: fadeInAnim }}>
            <Text
              fontSize="$2"
              color={YCM_COLORS.gray}
              textAlign="center"
              marginTop="$3"
              opacity={0.7}
            >
              Powered by Lana
            </Text>
          </Animated.View>
        </YStack>
      </SafeArea>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  logo: {
    width: 180,
    height: 90,
  },
});
