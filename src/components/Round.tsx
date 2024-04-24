import React, { useEffect, useMemo, useState } from 'react';
import colors from '../themes/colors';
import { Animated, Easing, StyleProp, View, ViewProps, ViewStyle } from 'react-native';

interface IRoundProps extends ViewProps {
  radius?: number;
  outerColor?: string;
  innerColor?: string;
}

const Round = ({radius = 200, outerColor = colors.primary, innerColor = colors.lightRed,  style, ...props}: IRoundProps) => {
  const [roundAnimation] = useState<Animated.Value>(
    new Animated.Value(0),
  );

  useEffect(() => {
    Animated.timing(roundAnimation, {
      toValue: 1,
      duration: 1000,
      easing: Easing.out(Easing.exp),
      useNativeDriver: false
    }).start();
  }, []);

  const roundStyles = useMemo(() => {
    const outerStyles: StyleProp<ViewStyle> = [
      {
        width: roundAnimation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, radius]
        }),
        height: roundAnimation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, radius]
        }),
        borderRadius: radius,
        backgroundColor: outerColor,
        alignItems: 'center',
        justifyContent: 'center'
      }, 
      style
    ];

    const innerRadius = (radius / 2) + (radius * 0.2);

    const innerStyles: StyleProp<ViewStyle> = [
      {
        width: innerRadius,
        height: innerRadius,
        borderRadius: innerRadius,
        backgroundColor: innerColor,
      }
    ]

    return {
      outerStyles: outerStyles,
      innerStyles: innerStyles
    };
  }, [radius, outerColor, innerColor, style]);

  return (
    <Animated.View 
      style={roundStyles.outerStyles}>
        <View style={roundStyles.innerStyles}></View>
    </Animated.View>
  );
};

export default Round;