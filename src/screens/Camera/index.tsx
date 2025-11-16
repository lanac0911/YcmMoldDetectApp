import React, { useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@navigation/AppNavigator';
import { useCameraDevice } from 'react-native-vision-camera';
import PreviewSelectImg from './PreviewSelectImg';
import CameraArea from './CameraArea';
import { Pressable, StyleSheet } from 'react-native';
import { View } from 'tamagui';
import { ShoppingCart } from '@tamagui/lucide-icons';

type Props = NativeStackScreenProps<RootStackParamList, 'Camera'>;

export default function CameraScreen({ navigation }: Props) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showCamera, setShowCamera] = useState(false);
  const [cameraPosition, setCameraPosition] = useState<'back' | 'front'>(
    'back',
  );

  const device = useCameraDevice(cameraPosition);

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
    <>
      <PreviewSelectImg
        selectedImage={selectedImage}
        setSelectedImage={setSelectedImage}
        setShowCamera={setShowCamera}
        loading={isLoading}
        setIsLoading={setIsLoading}
        navigation={navigation}
      />
      {/* 購物車 Fab Button */}
      <Pressable
        style={styles.floatButton}
        onPress={() => navigation.navigate('Cart')}
      >
        <View
          width={60}
          height={60}
          borderRadius={30}
          backgroundColor="$green10"
          justifyContent="center"
          alignItems="center"
          shadowColor="$shadowColor"
          shadowOffset={{ width: 0, height: 4 }}
          shadowOpacity={0.3}
          shadowRadius={8}
        >
          <ShoppingCart size={28} color="white" />
        </View>
      </Pressable>
    </>
  );
}

const styles = StyleSheet.create({
  floatButton: {
    position: 'absolute',
    bottom: 30,
    right: 20,
  },
});
