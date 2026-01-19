import React from 'react';
import type {PropsWithChildren} from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import FirstAnimation from './AnimationFiles/FirstAnimation';
import PanGestureAnimation from './AnimationFiles/PanGestureAnimation';
import ScrollViewAnimation from './AnimationFiles/ScrollViewAnimation/ScrollViewAnimation';
import InterpoalateColors from './AnimationFiles/InterpoalateColors';
import PinchGesture from './AnimationFiles/PinchGesture';
import TapGestureAnimation from './AnimationFiles/TapGestureAnimation';
import ScrollViewWithPanGesture from './AnimationFiles/ScrollViewAnimation/ScrollViewWithPanGesture';






function App(): React.JSX.Element {


  return ( 
    <GestureHandlerRootView style={styles.container}>
        <ScrollViewWithPanGesture />
     </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      // justifyContent: 'center',
      // alignItems: 'center'
   }
});

export default App;
