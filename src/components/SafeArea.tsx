import { PropsWithChildren } from 'react';
import { View } from 'tamagui';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function SafeArea({ children }: PropsWithChildren) {
  const insets = useSafeAreaInsets();

  return (
    <View
      flex={1}
      paddingTop={insets.top}
      paddingBottom={insets.bottom}
      bg="$background"
    >
      {children}
    </View>
  );
}
