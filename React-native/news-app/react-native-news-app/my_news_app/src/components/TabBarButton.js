import { Pressable, StyleSheet, Text } from 'react-native'
import React, { useEffect } from 'react'
import { Icons } from '../../constants/Icon'
import { colors } from '../../constants/colors'
import Animated , { useSharedValue,useAnimatedStyle, withSpring, interpolate } from 'react-native-reanimated'

const TabBarButton = ({ isFocused, options, onPress, onLongPress, label, routeName }) => {
  const IconComponent = Icons[routeName]; // Retrieve the icon component for the route
  const opacity = useSharedValue(0)
  
  useEffect(()=>{
    opacity.value = withSpring(
        typeof isFocused === 'boolean' ? (isFocused ? 1 : 0) : isFocused,
        {duration: 50}
    )
  },[isFocused,opacity])

  const textAnimatedStyle = useAnimatedStyle(()=>{
      const opacityValue = interpolate(opacity.value,[0,1],[1,0])
      return {
        opacity: opacityValue
      }
  })

  return (
    <Pressable
      key={routeName}
      accessibilityRole="button"
      accessibilityState={isFocused ? { selected: true } : {}}
      accessibilityLabel={options.tabBarAccessibilityLabel}
      testID={options.tabBarTestID}
      onPress={onPress}
      onLongPress={onLongPress}
      style={styles.tabBar}
    >
      {IconComponent ? (
        IconComponent({ isFocused, color: isFocused ? colors.tabIconSelected : colors.tabIconDefault })
      ) : null}
      <Animated.Text  style={[
          {
            color: isFocused ? colors.tabIconSelected : colors.tabIconDefault,
            fontSize: 12,
          },
          textAnimatedStyle,
        ]}>
        {label}
      </Animated.Text>
    </Pressable>
  )
}

export default TabBarButton

const styles = StyleSheet.create({
    tabBar: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        gap: 5,
    }
})
