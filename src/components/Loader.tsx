import React, { useEffect, useMemo, useState } from 'react';
import { Animated, Easing, StyleProp, StyleSheet, View, ViewProps, ViewStyle } from 'react-native';
import colors from '../themes/colors';

type OffsetPositionProps = 'top' | 'right' | 'bottom' | 'left';

interface ISpinnerProps extends ViewProps {
  radius?: number;
  color?: string;
  offsetPosition?: OffsetPositionProps;
}

const Spinner = ({
  radius = 80, 
  color = colors.primary,
  offsetPosition = 'top', 
  children, 
  style, 
  ...props

}: ISpinnerProps) => {
  const [loaderAnimation] = useState<Animated.Value>(new Animated.Value(0));

  const handleLoaderInit = () => {
    Animated.loop(
      Animated.timing(loaderAnimation, {
        toValue: 360,
        duration: 3000,
        easing: Easing.linear,
        useNativeDriver: true
      })
    ).start();
  }

  const spinnerStyle = useMemo(() => {
    let offsetStyle: StyleProp<ViewStyle>;

    switch(offsetPosition) {
      case 'top':
        offsetStyle = {borderTopColor: 'transparent'};
        break;
      case 'right':
        offsetStyle = {borderRightColor: 'transparent'};
        break;
      case 'bottom':
        offsetStyle = {borderBottomColor: 'transparent'};
        break;
      case 'left':
        offsetStyle = {borderLeftColor: 'transparent'};
        break;
      default:
        break;
    }

    return [
      {
        width: radius,
        height: radius,
        borderRadius: radius,
        borderColor: color,
        borderWidth: 7,
        transform: [{ 
          rotateZ: loaderAnimation.interpolate({
            inputRange: [0, 360],
            outputRange: ['0deg', '360deg']
          })
        }]
      },
      offsetStyle,
      styles.spinner
    ];
  }, [radius, color, offsetPosition, style, loaderAnimation]);

  useEffect(() => {
    handleLoaderInit();
  }, []);

  return (
    <Animated.View
      style={spinnerStyle}
      {...props}>
      {children}
      </Animated.View>
  )
};

const Loader = () => {

  return (
    <View style={styles.overlay}>
      <Spinner>
        <Spinner 
          radius={50} 
          color={colors.red} 
          offsetPosition='left'
          ></Spinner>
      </Spinner>
    </View>
  )
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 999
  },
  spinner: {
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default Loader;