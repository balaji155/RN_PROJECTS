import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  
} from 'react-native';
import Navigation from './Routes/Navigation';
import Icon from 'react-native-vector-icons/dist/FontAwesome';



function App(): React.JSX.Element {

  return (
       <Navigation />
  );
}

export const styles = StyleSheet.create({
  container:{
    flex: 1
  }
})

export default App;
