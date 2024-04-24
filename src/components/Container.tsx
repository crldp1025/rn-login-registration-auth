import React from 'react';
import { StyleSheet, View, ViewProps } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface IContainerProps extends ViewProps {
  isHeaderShown?: boolean;
}

const Container = ({ isHeaderShown = false, children, ...props }: IContainerProps) => {

  if(isHeaderShown) {
    return (
      <View style={styles.container} {...props}>
        {children}
      </View>
    );
  }

  return (
    <View style={styles.container} {...props}>
      <SafeAreaView>
        {children}
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }
});

export default Container;