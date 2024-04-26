import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import LoginScreen from '../screens/login/LoginScreen';
import RegistrationScreen from '../screens/registration/RegistrationScreen';
import HomeScreen from '../screens/home/HomeScreen';
import { useAppDispatch, useAppSelector } from '../tools/hooks';
import { authenticateUser } from '../state/auth/authSlice';
import Loader from './Loader';

const Stack = createNativeStackNavigator();

const UnauthenticatedRoutes = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'fade'
      }}>
      <Stack.Screen 
        name="Login" 
        component={LoginScreen} />
      <Stack.Screen 
        name="Registration" 
        component={RegistrationScreen} />
    </Stack.Navigator>
  );
};

const AuthenticatedRoutes = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'fade'
      }}>
      <Stack.Screen 
        name="Home" 
        component={HomeScreen} /> 
    </Stack.Navigator>
  );
};

const Navigation = () => {
  const { loading, user, error } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(authenticateUser());
  }, []);

  return (
    <NavigationContainer>
      {!loading && user &&
        <AuthenticatedRoutes />
      }
      {!loading && !user &&
        <UnauthenticatedRoutes />
      }
      {loading &&
        <Loader />
      }
    </NavigationContainer>
  );
}

export default Navigation;