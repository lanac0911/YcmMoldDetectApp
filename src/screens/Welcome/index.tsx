import React from 'react';
import { StyleSheet, Image } from 'react-native';
import { YStack, Text, Button, Circle } from 'tamagui';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@navigation/AppNavigator';
import LinearGradient from 'react-native-linear-gradient';
import { Camera as CameraIcon } from '@tamagui/lucide-icons';
import SafeArea from '@components/SafeArea';
import YcmLogo from '@styles/imgs/main-logo.png';
import { YCM_COLORS } from '@styles/imgs/themes';

type WelcomeScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Welcome'>;
};

export default function Welcome({ navigation }: WelcomeScreenProps) {
  return (
    <LinearGradient
      colors={['#FFFFFF', '#F0F8F0', '#E8F5E8']}
      style={styles.gradient}
    >
      <SafeArea>
        <YStack flex={1} justifyContent="space-between" padding="$6">
          <YStack flex={1} justifyContent="center" alignItems="center" gap="$5">
            {/* LOGO */}
            <Circle
              size={180}
              backgroundColor={YCM_COLORS.webHeader}
              alignItems="center"
              justifyContent="center"
            >
              <Image
                source={YcmLogo}
                style={{ width: 180, height: 90 }}
                resizeMode="contain"
              />
            </Circle>

            {/* Title */}
            <YStack alignItems="center" gap="$3">
              <Text
                fontSize="$10"
                fontWeight="700"
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
          </YStack>

          {/* 按鈕區 */}
          <Button
            size="$6"
            backgroundColor={YCM_COLORS.primary}
            color="white"
            fontSize="$6"
            fontWeight="700"
            borderRadius="$6"
            pressStyle={{
              backgroundColor: YCM_COLORS.dark,
              scale: 0.98,
            }}
            onPress={() => navigation.navigate('Camera')}
            icon={<CameraIcon size={24} color="white" />}
          >
            開始檢測
          </Button>

          <Text
            fontSize="$2"
            color={YCM_COLORS.gray}
            textAlign="center"
            marginTop="$3"
            opacity={0.7}
          >
            Powered by Lana
          </Text>
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
    marginBottom: 20,
  },
});
