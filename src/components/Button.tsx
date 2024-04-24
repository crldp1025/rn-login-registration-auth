import React from 'react';
import { StyleSheet, TextStyle, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import colors from '../themes/colors';
import Text from './Text';

interface IButtonProps extends TouchableOpacityProps {
  textStyles?: TextStyle;
}

const Button = ({ textStyles, children, style, ...props }: IButtonProps) => {
  return (
    <TouchableOpacity
      style={[styles.button, style]}
      {...props}
      >
      <Text
        style={[styles.buttonText, textStyles]}>
        My Button
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 20
  },
  buttonText: {
    color: colors.white,
    textAlign: 'center'
  }
});

export default Button;