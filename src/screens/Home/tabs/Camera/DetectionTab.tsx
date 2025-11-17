import React, { useState } from 'react';
import { useCameraDevice } from 'react-native-vision-camera';
import { YStack } from 'tamagui';
import { useFocusEffect } from '@react-navigation/native';
import CameraArea from './CameraArea';
import PreviewSelectImg from './PreviewSelectImg';

interface DetectionTabProps {
  navigation: any;
}

export default function DetectionTab({ navigation }: DetectionTabProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showCamera, setShowCamera] = useState(false);
  const [cameraPosition, setCameraPosition] = useState<'back' | 'front'>(
    'back',
  );

  const device = useCameraDevice(cameraPosition);

  // 清除圖片狀態
  useFocusEffect(
    React.useCallback(() => {
      console.log('🔄 DetectionTab focused - clearing image state');
      setSelectedImage(null);
      setIsLoading(false);
      setShowCamera(false);
    }, []),
  );

  // 相機拍照區域
  if (showCamera && device) {
    return (
      <CameraArea
        device={device}
        setSelectedImage={setSelectedImage}
        setShowCamera={setShowCamera}
        setCameraPosition={setCameraPosition}
      />
    );
  }

  // 預覽or選擇區域
  return (
    <YStack flex={1}>
      <PreviewSelectImg
        selectedImage={selectedImage}
        setSelectedImage={setSelectedImage}
        setShowCamera={setShowCamera}
        loading={isLoading}
        setIsLoading={setIsLoading}
        navigation={navigation}
      />
    </YStack>
  );
}
