import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, Image, Alert } from 'react-native';
import { YStack, Text, Button, Circle } from 'tamagui';
import { Image as ImageIcon } from '@tamagui/lucide-icons';
import { useCameraPermission } from 'react-native-vision-camera';
import { YCM_COLORS } from '@styles/imgs/themes';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@navigation/AppNavigator';
import { analyzeImageMold } from '@utils/detectMold';
import LoadingModal from '../modal/LoadingModal';
import ErrorModal from '../modal/ErrorModal ';
import RenderPreviewButton from './RenderPreviewButton';
import { useFocusEffect } from '@react-navigation/native';
import NetInfo from '@react-native-community/netinfo';

interface PreviewSelectImgProps {
  selectedImage: string | null;
  setSelectedImage: React.Dispatch<React.SetStateAction<string | null>>;
  setShowCamera: React.Dispatch<React.SetStateAction<boolean>>;
  loading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  navigation: NativeStackScreenProps<RootStackParamList, 'Home'>['navigation'];
}

export default function PreviewSelectImg({
  selectedImage,
  setSelectedImage,
  setShowCamera,
  loading,
  setIsLoading,
  navigation,
}: PreviewSelectImgProps) {
  const { hasPermission, requestPermission } = useCameraPermission();
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [hasInternet, setHasInternet] = useState(true);

  useEffect(() => {
    if (!hasPermission) {
      requestPermission();
    }
  }, [hasPermission, requestPermission]);

  const handleRetake = () => {
    setSelectedImage(null);
  };

  useFocusEffect(
    useCallback(() => {
      const netInfoSubscription = NetInfo.addEventListener(state => {
        setHasInternet(state.isConnected);
      });
      return () => {
        netInfoSubscription();
      };
    }, []),
  );

  // 呼叫 ChatGPT openAPI 分析
  const handleAnalyze = async () => {
    if (!selectedImage) {
      Alert.alert('請選擇圖片', '請先拍照或從相簿選擇圖片');
      return;
    }

    // 確認是否有網路連線
    if (!hasInternet) {
      setErrorMessage('目前沒有網路連線，請檢查網路後再試');
      setShowErrorModal(true);
      return;
    }

    setIsLoading(true);
    setErrorMessage('');

    try {
      const result = await analyzeImageMold(selectedImage);
      // 導航到結果頁面
      navigation.navigate('Result', {
        imageUri: selectedImage,
        isMoldy: result.isMoldy,
        confidence: result.confidence,
      });
    } catch (err: any) {
      // 設定錯誤訊息
      let errorMsg = 'AI 辨識過程發生問題，請重試';

      if (err.message) {
        if (err.message.includes('401')) {
          errorMsg = 'API 金鑰無效，請檢查設定';
        } else if (err.message.includes('403')) {
          errorMsg = '無權訪問 API，請檢查網路或 API 權限';
        } else if (err.message.includes('429')) {
          errorMsg = 'API 請求次數超過限制，請稍後再試';
        } else if (err.message.includes('Network')) {
          errorMsg = '網路連線失敗，請檢查網路狀態';
        } else {
          errorMsg = err.message;
        }
      }

      setErrorMessage(errorMsg);
      setShowErrorModal(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
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
                size="$5"
                onPress={handleRetake}
                icon={<ImageIcon size={20} />}
                disabled={loading}
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

        {/* 操作 Buttons */}
        <RenderPreviewButton
          loading={loading}
          hasPermission={hasPermission}
          requestPermission={requestPermission}
          setShowCamera={setShowCamera}
          selectedImage={selectedImage}
          setSelectedImage={setSelectedImage}
          handleAnalyze={handleAnalyze}
        />
      </YStack>

      {/* Loading Modal */}
      <LoadingModal isLoading={loading} />

      {/* Error Modal */}
      <ErrorModal
        showErrorModal={showErrorModal}
        errorMessage={errorMessage}
        setShowErrorModal={setShowErrorModal}
        handleAnalyze={handleAnalyze}
      />
    </>
  );
}

const styles = StyleSheet.create({
  preview: {
    width: '100%',
    height: 400,
    borderRadius: 12,
    backgroundColor: '#f0f0f0',
  },
});
