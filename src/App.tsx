import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {navigationRef} from './NavigationService';
import HomeScreen from './component/screen/appScreen/home';

function App(): React.JSX.Element {
  return (
    <View style={styles.container}>
      <NavigationContainer ref={navigationRef}>
        <HomeScreen />
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
