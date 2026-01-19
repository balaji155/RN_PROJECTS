import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import TabBarButton from './TabBarButton';
import { colors } from '../../constants/colors';
import { useState } from 'react';
import Animated,{ useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

export function TabBar({ state, descriptors, navigation }) {
  const [dimensions, setDimensions] = useState({ height: 20, width: 100 });

  const buttonWidth = dimensions.width / state.routes.length;

  const onTabbarLayout = (e) => {
    setDimensions({
      height: e.nativeEvent.layout.height,
      width: e.nativeEvent.layout.width,
    });
  };
  const transformX = useSharedValue(0)

  const transformStyles = useAnimatedStyle(() =>{
    return {
      transform: [{translateX: transformX.value }]
    }
  })
  return (
    <View onLayout={onTabbarLayout} style={styles.tabbar}>
      <Animated.View style={[styles.indicator,transformStyles]} />
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          transformX.value = withTiming(buttonWidth * index,{ duration: 200})
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
           <TabBarButton 
              isFocused={isFocused}
              options={options}
              onPress={onPress}
              onLongPress={onLongPress}
              label={label}
              routeName={route.name}
           />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
    tabbar:{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: colors.white,
        paddingTop: 16,
        paddingBottom:40,

    },
    indicator:{
      position: 'absolute',
      top: 50,
      left: 25,
      height: 8,
      width: 50,
      backgroundColor: colors.tint,
    }
})
