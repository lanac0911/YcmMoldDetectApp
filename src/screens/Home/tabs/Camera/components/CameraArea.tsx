import React, { useRef } from 'react';
import { StyleSheet, Pressable, Alert } from 'react-native';
import { YStack, XStack, View, Button } from 'tamagui';
import { X, FlipHorizontal } from '@tamagui/lucide-icons';
import { Camera, CameraDevice } from 'react-native-vision-camera';
import { YCM_COLORS } from '@styles/imgs/themes';

interface CameraAreaProps {
  device: CameraDevice;
  setSelectedImage: React.Dispatch<React.SetStateAction<string | null>>;
  setShowCamera: React.Dispatch<React.SetStateAction<boolean>>;
  setCameraPosition: React.Dispatch<React.SetStateAction<'back' | 'front'>>;
}

const CameraArea: React.FC<CameraAreaProps> = ({
  device,
  setSelectedImage,
  setShowCamera,
  setCameraPosition,
}) => {
  const camera = useRef<Camera>(null);

  // 處理：按下拍照的邏輯
  const handleTakePhoto = async () => {
    if (camera.current) {
      try {
        const photo = await camera.current.takePhoto({
          flash: 'off',
        });

        setSelectedImage(`file://${photo.path}`);
        setShowCamera(false);
      } catch (error) {
        Alert.alert('錯誤', '拍照失敗，請重試');
      }
    }
  };

  // 翻轉前後鏡頭
  const handleFlipCamera = () => {
    setCameraPosition(prev => (prev === 'back' ? 'front' : 'back'));
  };

  // 關閉相機
  const handleCloseCamera = () => {
    setShowCamera(false);
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'black' }}>
      <Camera
        ref={camera}
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={true}
        photo={true}
      />

      {/* 控制按鈕 */}
      <View style={styles.controlsContainer}>
        <XStack padding="$4" justifyContent="space-between" alignItems="center">
          {/* 關閉相機 */}
          <Button
            onPress={handleCloseCamera}
            icon={<X size={24} color="white" />}
            circular
            style={styles.buttons}
          />

          {/* 翻轉相機 */}
          <Button
            onPress={handleFlipCamera}
            icon={<FlipHorizontal size={24} color="white" />}
            circular
            style={styles.buttons}
          />
        </XStack>

        {/* 拍照按鈕 */}
        <YStack style={styles.captureButtonContainer}>
          <Button unstyled onPress={handleTakePhoto}>
            <View style={styles.captureButton}>
              <View style={styles.captureButtonInner} />
            </View>
          </Button>
        </YStack>
      </View>
    </View>
  );
};

export default CameraArea;

const styles = StyleSheet.create({
  controlsContainer: {
    flex: 1,
    justifyContent: 'space-between',
    paddingTop: 60,
    paddingBottom: 40,
  },
  buttons: {
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  captureButtonContainer: {
    alignItems: 'center',
    paddingBottom: 20,
  },
  captureButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255,255,255,0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  captureButtonInner: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: YCM_COLORS.primary,
  },
});
