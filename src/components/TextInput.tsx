import React from 'react';
import { TextInput as RNTextInput, StyleSheet, TextInputProps } from 'react-native';
import colors from '../themes/colors';

interface ITextInputProps extends TextInputProps {}

const TextInput = ({style, ...props}: ITextInputProps) => {
  return (
    <RNTextInput 
      style={[styles.textInput, style]}
      placeholderTextColor="rgba(255, 255, 255, 0.7)"
      {...props}
      />
  );
};

const styles = StyleSheet.create({
  textInput: {
    width: '100%',
    borderWidth: 2,
    borderColor: colors.white,
    padding: 16,
    borderRadius: 16,
    color: colors.white,
    fontSize: 16
  }
});

export default TextInput;