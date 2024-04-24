import React from 'react';
import { Text as RNText, StyleSheet, TextProps } from 'react-native';
import colors from '../themes/colors';

interface ITextProps extends TextProps {}

const Text = ({ children, style, ...props }: ITextProps) => {
  return (
    <RNText
      style={[styles.text, style]}
      {...props}>
      {children}
    </RNText>
  );
};

const styles = StyleSheet.create({
  text: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 16,
    color: colors.darkGray
  }
});

export default Text;