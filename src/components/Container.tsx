import React, { useEffect, useState } from 'react';
import { Animated, Dimensions, StyleSheet, View, ViewProps } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import colors from '../themes/colors';
import Round from './Round';
import LinearGradient from 'react-native-linear-gradient';

interface IContainerProps extends ViewProps {}

const Container = ({children, style, ...props}: IContainerProps) => {
  const [contentAnimation] = useState<Animated.Value>(
    new Animated.Value(0),
  );

  const setFormAnimation = (value: number = 1) => {
    Animated.timing(contentAnimation, {
      toValue: 1,
      duration: 500,
      useNativeDriver: false
    }).start();
  }

  useEffect(() => {
    setFormAnimation();
  }, []);

  return (
    <View style={styles.container}>
      <LinearGradient colors={[colors.primary, colors.lightRed]} style={{flex: 1}}>
        <Round 
          radius={500} 
          outerColor='#c73838' 
          innerColor={colors.primary}
          style={{
            position: 'absolute',
            top: '-10%',
            left: '-20%'
          }} />
          <SafeAreaView style={[styles.container, style]} {...props}>
            {children}
          </SafeAreaView>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});

export default Container;