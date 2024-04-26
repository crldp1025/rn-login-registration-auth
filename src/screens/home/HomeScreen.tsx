import React from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import Text from '../../components/Text';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '../../components/Button';
import colors from '../../themes/colors';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useAppDispatch } from '../../tools/hooks';
import { logoutUser } from '../../state/auth/authSlice';
import Loader from '../../components/Loader';

const HomeScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const dispatch = useAppDispatch();

  const handleOnPressSignOut = () => {
    Alert.alert('Sign Out', 'Are you sure you want to sign out your account?', [
      {
        text: 'Confirm',
        onPress: () =>  dispatch(logoutUser())
      },
      {
        text: 'Cancel',
        style: 'destructive'
      }
    ]);
  }
  
  return (
    <>
      <SafeAreaView style={styles.container}>
        <View style={styles.innerContainer}>
          <Text style={styles.header}>
            Welcome
          </Text>
          <Text style={styles.subHeader}>
            Carlo Papolonias
          </Text>
        </View>
        <View>
          <Button
            onPress={() => handleOnPressSignOut()}>
            Sign Out
          </Button>
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 20
  },
  innerContainer: {
    flex: 1
  },
  header: {
    fontSize: 40,
    fontWeight: '600',
    color: colors.primary
  },
  subHeader: {
    fontSize: 30,
    fontWeight: '500',
    color: colors.lightRed
  }
});

export default HomeScreen;