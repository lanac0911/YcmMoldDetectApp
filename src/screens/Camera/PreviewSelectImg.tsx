import React, { useEffect } from 'react';
import { StyleSheet, Image, Alert, Pressable } from 'react-native';
import { YStack, Text, Button, Circle } from 'tamagui';
import {
  Camera as CameraIcon,
  Image as ImageIcon,
} from '@tamagui/lucide-icons';
import { useCameraPermission } from 'react-native-vision-camera';
import { launchImageLibrary } from 'react-native-image-picker';
import SafeArea from '@components/SafeArea';
import { YCM_COLORS } from '@styles/imgs/themes';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@navigation/AppNavigator';

interface PreviewSelectImgProps {
  selectedImage: string | null;
  setSelectedImage: React.Dispatch<React.SetStateAction<string | null>>;
  setShowCamera: React.Dispatch<React.SetStateAction<boolean>>;
  loading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  navigation: NativeStackScreenProps<
    RootStackParamList,
    'Camera'
  >['navigation'];
}

export const PreviewSelectImg: React.FC<PreviewSelectImgProps> = ({
  selectedImage,
  setSelectedImage,
  setShowCamera,
  loading,
  setIsLoading,
  navigation,
}) => {
  const { hasPermission, requestPermission } = useCameraPermission();

  useEffect(() => {
    if (!hasPermission) {
      requestPermission();
    }
  }, [hasPermission]);

  const handleRetake = () => {
    setSelectedImage(null);
  };
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

  // Mock / TODO：call api 分析
  const handleAnalyze = () => {
    if (!selectedImage) {
      Alert.alert('請選擇圖片', '請先拍照或從相簿選擇圖片');
      return;
    }

    setIsLoading(true);

    navigation.navigate('Result', {
      imageUri: selectedImage,
      isMoldy: true, // TODO
      confidence: 0.87, // TODO
    });
  };

  return (
    <SafeArea>
      <YStack flex={1} backgroundColor="$background">
        <YStack
          flex={1}
          justifyContent="center"
          alignItems="center"
          padding="$4"
        >
          {selectedImage ? (
            <YStack gap="$4" width="100%" alignItems="center">
              <Image
                source={{ uri: selectedImage }}
                style={styles.preview}
                resizeMode="contain"
              />
              <Button
                size="$3"
                chromeless
                color="$red10"
                onPress={handleRetake}
                icon={<ImageIcon size={20} color="#EF5350" />}
              >
                重新選擇
              </Button>
            </YStack>
          ) : (
            <YStack alignItems="center" gap="$4">
              <Circle size={120} backgroundColor="$gray3">
                <ImageIcon size={60} color="#ccc" />
              </Circle>
              <Text fontSize="$5" color={YCM_COLORS.gray} textAlign="center">
                拍照或選擇照片進行檢測
              </Text>
            </YStack>
          )}
        </YStack>

        <YStack padding="$4" gap="$3" backgroundColor="white">
          {!selectedImage ? (
            <>
              <Button
                size="$6"
                backgroundColor={YCM_COLORS.primary}
                pressStyle={{ backgroundColor: YCM_COLORS.dark, scale: 0.98 }}
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
                pressStyle={{ backgroundColor: '#F0F8F0', scale: 0.98 }}
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
              size="$6"
              backgroundColor={YCM_COLORS.primary}
              pressStyle={{ backgroundColor: YCM_COLORS.dark, scale: 0.98 }}
              icon={<CameraIcon size={24} color="white" />}
              onPress={handleAnalyze}
              disabled={loading}
            >
              <Text color="white" fontSize="$6" fontWeight="700">
                {loading ? '處理中...' : '開始分析'}
              </Text>
            </Button>
          )}
        </YStack>
      </YStack>
    </SafeArea>
  );
};

export default PreviewSelectImg;

const styles = StyleSheet.create({
  preview: {
    width: '100%',
    height: 400,
    borderRadius: 12,
    backgroundColor: '#f0f0f0',
  },
});
