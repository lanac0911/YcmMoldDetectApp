import React, { useState } from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@navigation/AppNavigator';
import { useCameraDevice } from 'react-native-vision-camera';
import PreviewSelectImg from './PreviewSelectImg';
import CameraArea from './CameraArea';
import { YStack } from 'tamagui';

type DetectionTabProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Home'>;
};

export default function DetectionTab({ navigation }: DetectionTabProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showCamera, setShowCamera] = useState(false);
  const [cameraPosition, setCameraPosition] = useState<'back' | 'front'>(
    'back',
  );

  const device = useCameraDevice(cameraPosition);

  // 相機拍照區域 - 直接返回全屏相機
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
