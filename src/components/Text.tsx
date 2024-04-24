import React from 'react';
import { Text as RNText, StyleSheet, TextProps } from 'react-native';

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
    fontFamily: 'OpenSans-Regular'
  }
});

export default Text;