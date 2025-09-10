import {useFocusEffect} from '@react-navigation/native';
import React from 'react';
import {
  ColorValue,
  StatusBar,
  StatusBarStyle,
  StyleProp,
  View,
  ViewStyle,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import colors from '../../../utility/colors';

type AppContainerProps = {
  barStyle?: StatusBarStyle;
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
  backgroundColor?: ColorValue;
  statusBarColor?: ColorValue;
};

function AppContainer({
  barStyle,
  style,
  children,
  backgroundColor,
  statusBarColor,
}: AppContainerProps) {
  useFocusEffect(() => {
    StatusBar.setBarStyle(barStyle || 'dark-content');
  });

  return (
    <SafeAreaView
      // edges={['top']}
      style={{
        flex: 1,
        backgroundColor:
          statusBarColor || backgroundColor || colors.APP_BACKGROUND_WHITE,
      }}>
      <View
        style={[
          {flex: 1},
          {backgroundColor: backgroundColor || colors.APP_BACKGROUND_WHITE},
          style,
        ]}>
        {children}
      </View>
    </SafeAreaView>
  );
}

export default AppContainer;
