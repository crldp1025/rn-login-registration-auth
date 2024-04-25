import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import LoginScreen from './src/screens/login/LoginScreen';
import RegistrationScreen from './src/screens/registration/RegistrationScreen';
import ForgotPasswordScreen from './src/screens/forgotPassword/ForgotPasswordScreen';
import HomeScreen from './src/screens/home/HomeScreen';
import { Provider } from 'react-redux';
import { store } from './src/state/store';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            animation: 'fade'
          }}>
          {/* <Stack.Screen 
            name="Home" 
            component={HomeScreen} /> */}
          <Stack.Screen 
            name="Login" 
            component={LoginScreen} />
          <Stack.Screen 
            name="Registration" 
            component={RegistrationScreen} />
          <Stack.Screen 
            name="ForgotPassword" 
            component={ForgotPasswordScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;
