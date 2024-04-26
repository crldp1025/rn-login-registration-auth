import React, { useEffect, useState } from 'react';
import Button from '../Button';
import TextInput from '../TextInput';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { FormContainer, FormFooter, FormRow, FormTitle, FormView } from '../Form';
import { IUserLoginProps } from '../../interfaces/User';
import { useAppDispatch, useAppSelector } from '../../tools/hooks';
import { authenticateUser, clearLoginForm, loginUser } from '../../state/auth/authSlice';

const LoginForm = () => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const [loginForm, setLoginForm] = useState<IUserLoginProps>({email: '', password: ''});
  const { loading } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  // useEffect(() => {
  //   return () => {
  //     dispatch(clearLoginForm());
  //   };
  // }, []);

  return (
    <FormContainer>
      <FormView>
        <FormTitle>Sign In</FormTitle>
        <FormRow>
          <TextInput 
            value={loginForm.email}
            placeholder='Email Address'
            autoCapitalize='none'
            onChangeText={text => setLoginForm({...loginForm, email: text})}
            editable={!loading} />
        </FormRow>
        <FormRow>
          <TextInput 
            value={loginForm.password}
            placeholder='Password'
            autoCapitalize='none'
            secureTextEntry={true}
            onChangeText={text => setLoginForm({...loginForm, password: text})}
            editable={!loading} />
        </FormRow>
        {/* <Button 
          type='clear' 
          color='secondary'
          onPress={() => navigation.navigate('ForgotPassword')}>
          Forgot Password?
        </Button> */}
        <FormRow style={{marginTop: 10}}>
          <Button 
            color='secondary' 
            onPress={() => dispatch(loginUser(loginForm))}
            loading={loading}
          >
            Login
          </Button>
        </FormRow>
      </FormView>
      <FormFooter>
        <Button 
          onPress={() => navigation.navigate('Registration')}
          disabled={loading}
        >
          Create your Account
        </Button>
      </FormFooter>
    </FormContainer>
  );
};

export default LoginForm;