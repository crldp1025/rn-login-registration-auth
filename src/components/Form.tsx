import React from 'react';
import { StyleSheet, TextProps, View, ViewProps } from 'react-native';
import Text from './Text';
import colors from '../themes/colors';

export const FormContainer = ({ children, style, ...props }: ViewProps) => {
  
  return (
    <View
      style={[styles.container, style]}
      {...props}>
      {children}
    </View>
  );
};

export const FormView = ({ children, style, ...props }: ViewProps) => {
  return (
    <View 
      style={[styles.view, style]}
      {...props}>
      {children}
    </View>
  );
};


export const FormTitle = ({ children, style, ...props }: TextProps) => {
  return (
    <Text
      style={[styles.title, style]}
      {...props}>
      {children}
    </Text>
  );
};

export const FormRow = ({ children, style, ...props }: ViewProps) => {
  return (
    <View
      style={[styles.row, style]}
      {...props}>
      {children}
    </View>
  );
};

export const FormFooter = ({ children, style, ...props }: ViewProps) => {
  return (
    <View
      style={[styles.footer, style]}
      {...props}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center',
  },
  view: {
    flex: 1,
    width: '100%',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontSize: 35, 
    fontWeight: '700',
    color: colors.white, 
    marginBottom: 20
  },
  row: {
    width: '100%',
    marginBottom: 10
  },
  footer: {
    width: '100%', 
    paddingHorizontal: 20
  }
});