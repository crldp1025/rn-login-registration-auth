import React, { useState } from 'react';
import { FormContainer, FormFooter, FormRow, FormTitle, FormView } from '../Form';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import TextInput from '../TextInput';
import Button from '../Button';

const ForgotPasswordForm = () => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const [email, setEmail] = useState<string>('');

  return (
    <FormContainer>
      <FormView>
        <FormTitle>Forgot Password</FormTitle>
        <FormRow>
          <TextInput 
            value={email}
            placeholder='Email Address'
            autoCapitalize='none'
            onChangeText={text => setEmail(text)} />
        </FormRow>
        <FormRow style={{marginTop: 10}}>
          <Button color='secondary'>
            Send Email
          </Button>
        </FormRow>
      </FormView>
      <FormFooter>
        <Button onPress={() => navigation.navigate('Login')}>
          Sign In
        </Button>
      </FormFooter>
    </FormContainer>
  );
};

export default ForgotPasswordForm;