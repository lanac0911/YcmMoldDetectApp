import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import DetectionTab from '@screens/Home/tabs/Camera/DetectionTab';
import HistoryTab from '@screens/Home/tabs/History/HistoryTab';
import { Camera, History } from '@tamagui/lucide-icons';
import { YCM_COLORS } from '@styles/imgs/themes';

const Tab = createBottomTabNavigator();

export default function HomeTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: YCM_COLORS.primary,
        tabBarInactiveTintColor: '#999',
        tabBarStyle: {
          height: 62,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
      }}
    >
      <Tab.Screen
        name="Detection"
        component={DetectionTab}
        options={{
          title: '檢測',
          tabBarIcon: ({ color }) => <Camera size={22} color={color} />,
        }}
      />

      <Tab.Screen
        name="History"
        component={HistoryTab}
        options={{
          title: '歷史紀錄',
          tabBarIcon: ({ color }) => <History size={22} color={color} />,
        }}
      />
    </Tab.Navigator>
  );
}
