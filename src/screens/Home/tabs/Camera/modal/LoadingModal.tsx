import { Modal, ActivityIndicator } from 'react-native';
import { XStack, YStack, Text, View } from 'tamagui';
import { YCM_COLORS } from '@styles/imgs/themes';

interface LoadingModalProps {
  isLoading: boolean;
}

const LoadingModal = ({ isLoading }: LoadingModalProps) => {
  return (
    <Modal
      visible={isLoading}
      transparent
      animationType="fade"
      statusBarTranslucent
    >
      <View
        style={{
          flex: 1,
          backgroundColor: 'rgba(0,0,0,0.7)',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 20,
        }}
      >
        {/* Card */}
        <YStack
          backgroundColor="white"
          borderRadius={20}
          padding={32}
          alignItems="center"
          minWidth={280}
          maxWidth={340}
          shadowColor="#000"
          shadowOffset={{ width: 0, height: 4 }}
          shadowOpacity={0.25}
          shadowRadius={12}
          elevation={8}
        >
          {/* Spinner */}
          <ActivityIndicator size="large" color={YCM_COLORS.primary} />

          {/* 標題 */}
          <Text
            fontSize="$5"
            fontWeight="700"
            color={YCM_COLORS.dark}
            marginTop="$4"
          >
            AI 正在分析圖片
          </Text>

          {/* 副標題 */}
          <Text
            fontSize="$3"
            color="$gray10"
            marginTop="$2"
            textAlign="center"
            lineHeight={20}
          >
            請稍候，這可能需要幾秒鐘...
          </Text>

          {/* 動畫點點 */}
          <XStack gap="$2" marginTop="$3">
            <YStack
              width={8}
              height={8}
              borderRadius={4}
              backgroundColor={YCM_COLORS.primary}
              opacity={0.3}
            />
            <YStack
              width={8}
              height={8}
              borderRadius={4}
              backgroundColor={YCM_COLORS.primary}
              opacity={0.6}
            />
            <YStack
              width={8}
              height={8}
              borderRadius={4}
              backgroundColor={YCM_COLORS.primary}
            />
          </XStack>
        </YStack>
      </View>
    </Modal>
  );
};

export default LoadingModal;
