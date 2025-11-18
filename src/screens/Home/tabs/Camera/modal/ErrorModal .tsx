import { Modal } from 'react-native';
import { XStack, YStack, Text, Button, View } from 'tamagui';
import { AlertCircle } from '@tamagui/lucide-icons';
import { modalOverlay } from '@styles/share';
import { theme } from '@styles/imgs/themes';

interface ErrorModalProps {
  showErrorModal: boolean;
  errorMessage: string;
  setShowErrorModal: (v: boolean) => void;
  handleAnalyze: () => void;
}

const ErrorModal = ({
  showErrorModal,
  errorMessage,
  setShowErrorModal,
  handleAnalyze,
}: ErrorModalProps) => {
  return (
    <Modal
      visible={showErrorModal}
      transparent
      animationType="fade"
      statusBarTranslucent
      onRequestClose={() => setShowErrorModal(false)}
    >
      <View style={modalOverlay}>
        {/* Card */}
        <YStack
          backgroundColor="white"
          borderRadius={20}
          padding={28}
          alignItems="center"
          width="90%"
          maxWidth={380}
          shadowColor="#000"
          shadowOffset={{ width: 0, height: 4 }}
          shadowOpacity={0.25}
          shadowRadius={12}
          elevation={10}
        >
          {/* Icon */}
          <YStack
            width={80}
            height={80}
            borderRadius={40}
            alignItems="center"
            justifyContent="center"
            backgroundColor="#FEE2E2"
            marginBottom="$4"
          >
            <AlertCircle size={48} color={theme.error.color} />
          </YStack>

          {/* Title */}
          <Text
            fontSize="$7"
            fontWeight="800"
            color={theme.error.color}
            marginBottom="$2"
          >
            分析失敗
          </Text>

          {/* Error 詳細 */}
          <Text
            fontSize="$4"
            color="$gray11"
            textAlign="center"
            marginBottom="$4"
            lineHeight={22}
          >
            {errorMessage}
          </Text>

          {/* Buttons */}
          <XStack gap="$3" width="100%">
            <Button
              flex={1}
              size="$4"
              backgroundColor="$gray4"
              onPress={() => setShowErrorModal(false)}
              pressStyle={{ backgroundColor: '$gray5', scale: 0.98 }}
            >
              <Text fontSize="$4" fontWeight="600" color="$gray11">
                取消
              </Text>
            </Button>

            <Button
              flex={1}
              size="$4"
              bg={theme.error.color}
              onPress={() => {
                setShowErrorModal(false);
                handleAnalyze();
              }}
              pressStyle={theme.errorPressStyle}
            >
              <Text fontSize="$4" fontWeight="700" color="white">
                重試
              </Text>
            </Button>
          </XStack>
        </YStack>
      </View>
    </Modal>
  );
};

export default ErrorModal;
