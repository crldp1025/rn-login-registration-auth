import React, { useMemo } from 'react';
import { StyleProp, StyleSheet, TextStyle, TouchableOpacity, TouchableOpacityProps, ViewStyle, TextStyle as RNTextStyle, ActivityIndicator } from 'react-native';
import colors from '../themes/colors';
import Text from './Text';

type ButtonTypeProps = 'solid' | 'outline' | 'clear';
type ButtonColorProps = 'primary' | 'secondary';

interface IButtonProps extends TouchableOpacityProps {
  type?: ButtonTypeProps;
  color?: ButtonColorProps | string;
  textStyle?: TextStyle;
  loading?: boolean;
}

const buttonColor = {
  'primary': colors.primary,
  'secondary': colors.white
}

const Button = ({ 
  type = 'solid', 
  color = 'primary', 
  textStyle, 
  loading = false,
  children, 
  style, 
  ...props 

}: IButtonProps) => {
  const baseColor = useMemo(() => {
    let colorVal = buttonColor[color as keyof typeof buttonColor];
    if(!colorVal) colorVal = color;
    return colorVal;
  }, [color]);

  const buttonStyle = useMemo(() => {
    let compStyle: StyleProp<ViewStyle>;

    switch(type) {
      case 'outline':
        compStyle = {
          backgroundColor: 'transparent',
          borderColor: baseColor
        };
        break;
      case 'clear':
        compStyle = {
          backgroundColor: 'transparent',
          borderWidth: 0
        };
        break;
      default:
        compStyle = {
          backgroundColor: baseColor,
          borderColor: baseColor
        };
        break;
    }

    return [styles.button, compStyle, style];
  }, [type, color, style]);

  const buttonTextStyle = useMemo(() => {
    let compStyle: StyleProp<RNTextStyle>;

    if(type === 'solid') {
      compStyle = (color === 'secondary') ? {color: colors.primary} : {color: colors.white};
    } else if(type === 'outline') {
      compStyle = {color: baseColor}
    } else {
      compStyle = {color: baseColor, fontWeight: '400'}
    }

    return [styles.buttonText, compStyle, style];
  }, [type, color, textStyle]);

  return (
    <TouchableOpacity
      style={buttonStyle}
      disabled={loading}
      {...props}>
      {!loading &&
        <Text
          style={buttonTextStyle}>
          {children}
        </Text>
      }
      {loading && 
        <ActivityIndicator color={colors.primary} />
      }
        
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: '100%',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 3,
  },
  buttonText: {
    textAlign: 'center',
    fontWeight: '600'
  }
});

export default Button;