import React, { useState } from 'react';
import Button from '../Button';
import TextInput from '../TextInput';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { FormContainer, FormFooter, FormRow, FormTitle, FormView } from '../Form';
import { IUserLoginProps } from '../../interfaces/User';

const LoginForm = () => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const [loginForm, setLoginForm] = useState<IUserLoginProps>({email: '', password: ''});

  return (
    <FormContainer>
      <FormView>
        <FormTitle>Sign In</FormTitle>
        <FormRow>
          <TextInput 
            value={loginForm.email}
            placeholder='Email Address'
            autoCapitalize='none'
            onChangeText={text => setLoginForm({...loginForm, email: text})} />
        </FormRow>
        <FormRow>
          <TextInput 
            value={loginForm.password}
            placeholder='Password'
            autoCapitalize='none'
            secureTextEntry={true}
            onChangeText={text => setLoginForm({...loginForm, password: text})} />
        </FormRow>
        <Button 
          type='clear' 
          color='secondary'
          onPress={() => navigation.navigate('ForgotPassword')}>
          Forgot Password?
        </Button>
        <Button color='secondary'>
          Login
        </Button>
      </FormView>
      <FormFooter>
        <Button onPress={() => navigation.navigate('Registration')}>
          Create your Account
        </Button>
      </FormFooter>
    </FormContainer>
  );
};

export default LoginForm;