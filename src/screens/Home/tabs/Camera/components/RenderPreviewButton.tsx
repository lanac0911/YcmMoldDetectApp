import { Alert } from 'react-native';
import { YStack, Text, Button } from 'tamagui';
import {
  Camera as CameraIcon,
  Image as ImageIcon,
} from '@tamagui/lucide-icons';
import { launchImageLibrary } from 'react-native-image-picker';
import { theme, YCM_COLORS } from '@styles/imgs/themes';

interface RenderPreviewButtonProps {
  loading: boolean;
  hasPermission: boolean;
  requestPermission: () => Promise<boolean>;
  setShowCamera: React.Dispatch<React.SetStateAction<boolean>>;
  selectedImage: string | null;
  setSelectedImage: React.Dispatch<React.SetStateAction<string | null>>;
  handleAnalyze: () => Promise<void>;
}

const RenderPreviewButton = ({
  loading,
  hasPermission,
  requestPermission,
  setShowCamera,
  selectedImage,
  setSelectedImage,
  handleAnalyze,
}: RenderPreviewButtonProps) => {
  // 開啟相機權限
  const handleOpenCamera = async () => {
    if (!hasPermission) {
      const granted = await requestPermission();
      if (!granted) {
        Alert.alert('需要相機權限', '請在設定中允許使用相機');
        return;
      }
    }
    setShowCamera(true);
  };

  const buttonShareStyle = {
    size: '$6' as const,
    backgroundColor: YCM_COLORS.primary,
    pressStyle: { backgroundColor: YCM_COLORS.dark, scale: 0.98 },
  };

  // 處理：選擇相片的邏輯
  const handlePickImage = async () => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      quality: 0.8,
    });

    if (result.assets && result.assets[0] && result.assets[0].uri) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  return (
    <YStack padding="$4" gap="$3" backgroundColor="white">
      {!selectedImage ? (
        <>
          <Button
            {...buttonShareStyle}
            icon={<CameraIcon size={24} color="white" />}
            onPress={handleOpenCamera}
          >
            <Text color="white" fontSize="$6" fontWeight="700">
              拍照
            </Text>
          </Button>
          <Button
            size="$6"
            bordered
            borderWidth={2}
            borderColor={YCM_COLORS.primary}
            backgroundColor="white"
            pressStyle={theme.whitePressStyle}
            icon={<ImageIcon size={24} color={YCM_COLORS.primary} />}
            onPress={handlePickImage}
          >
            <Text color={YCM_COLORS.primary} fontSize="$6" fontWeight="600">
              從相簿選擇
            </Text>
          </Button>
        </>
      ) : (
        <Button
          {...buttonShareStyle}
          icon={<CameraIcon size={24} color="white" />}
          onPress={handleAnalyze}
          disabled={loading}
          opacity={loading ? 0.6 : 1}
        >
          <Text color="white" fontSize="$6" fontWeight="700">
            {loading ? 'AI 分析中...' : '開始分析'}
          </Text>
        </Button>
      )}
    </YStack>
  );
};

export default RenderPreviewButton;
