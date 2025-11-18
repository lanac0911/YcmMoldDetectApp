import React from 'react';
import { Linking, ScrollView } from 'react-native';
import {
  Dialog,
  Adapt,
  Sheet,
  YStack,
  XStack,
  Text,
  Button,
  Image,
  View,
} from 'tamagui';
import { X } from '@tamagui/lucide-icons';
import { YCM_COLORS } from '@styles/imgs/themes';
import { WooProduct } from 'typedef/productAPI';
import { BASE_URL_PREFIX } from '@services/apiManager';
import { LOCAL_PREFIX } from '@store/wooProductsStore';

// HTML -> 轉成純文字
const stripHtml = (html?: string) =>
  html ? html.replace(/<[^>]+>/g, '').trim() : '';

interface DialogProps {
  product: WooProduct | null;
  onClose: () => void;
}

const ProductDetailDialog: React.FC<DialogProps> = ({ product, onClose }) => {
  if (!product) return null;

  return (
    <Dialog open={!!product} onOpenChange={open => !open && onClose()}>
      <Adapt when="sm" platform="android">
        <Sheet animation="medium" snapPoints={[85]} dismissOnSnapToBottom>
          <Sheet.Overlay />
          <Sheet.Handle />
          <Sheet.Frame maxHeight="80%" padding="$4">
            <Content product={product} onClose={onClose} />
          </Sheet.Frame>
        </Sheet>
      </Adapt>

      <Dialog.Portal>
        <Dialog.Overlay
          key="overlay"
          animation="quick"
          opacity={0.9}
          enterStyle={{ opacity: 0 }}
          exitStyle={{ opacity: 0 }}
        />

        <Dialog.Content
          key="content"
          elevate
          bordered
          backgroundColor="white"
          padding="$4"
          w={'85%'}
          margin="$4"
          animation="quick"
          enterStyle={{ opacity: 0, scale: 0.9 }}
          exitStyle={{ opacity: 0, scale: 0.95 }}
        >
          <Content product={product} onClose={onClose} />
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog>
  );
};

const Content = ({
  product,
  onClose,
}: {
  product: WooProduct;
  onClose: () => void;
}) => {
  return (
    <YStack gap="$4">
      {/* Header */}
      <XStack justifyContent="space-between" alignItems="center" gap="$1">
        <Text fontSize="$7" fontWeight="bold" color={YCM_COLORS.dark} f={5}>
          {product.name}
        </Text>

        <Button
          circular
          size="$3"
          backgroundColor="$gray3"
          onPress={onClose}
          f={1}
        >
          <X size={20} color="$gray10" />
        </Button>
      </XStack>

      {/* Image */}
      {product.images?.[0]?.src && (
        <Image
          source={{ uri: product.images[0].src }}
          width="100%"
          height={200}
          borderRadius={12}
          resizeMode="contain"
        />
      )}

      <ScrollView style={{ maxHeight: 400 }}>
        <YStack gap="$3">
          {/* 價格 */}
          <Text fontSize="$8" fontWeight="bold" color={YCM_COLORS.primary}>
            ${product.price}
          </Text>

          {/* 庫存 */}
          <Text fontSize="$5" color="$gray10">
            庫存： {product.stock_status === 'instock' ? '有貨 ✓' : '缺貨 ✕'}
          </Text>

          {/* 分類 */}
          {product.categories.length > 0 && (
            <XStack gap="$2">
              <Text fontSize="$5">分類：</Text>
              <View
                paddingHorizontal="$2.5"
                paddingVertical="$1"
                borderRadius={6}
                backgroundColor={'$gray9'}
              >
                <Text fontSize="$1" color="white" letterSpacing={0.5}>
                  {product.categories.map(c => c.name).join(' / ')}
                </Text>
              </View>
            </XStack>
          )}

          {/* 描述 */}
          <YStack marginTop="$2">
            <Text fontSize="$5" fontWeight="bold" marginBottom="$2">
              商品描述
            </Text>
            <Text fontSize="$5" color="$gray11">
              {stripHtml(product.description)}
            </Text>
          </YStack>

          {/* 連結 */}
          <Button
            marginTop="$3"
            backgroundColor={YCM_COLORS.primary}
            color="white"
            onPress={() => {
              Linking.openURL(
                product.permalink.replace(LOCAL_PREFIX, BASE_URL_PREFIX),
              );
            }}
          >
            前往商品頁
          </Button>
        </YStack>
      </ScrollView>
    </YStack>
  );
};

export default ProductDetailDialog;
