import React, { useState } from 'react';
import { FormContainer, FormFooter, FormRow, FormTitle, FormView } from '../Form';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import TextInput from '../TextInput';
import Button from '../Button';
import Text from '../Text';
import { StyleSheet } from 'react-native';
import colors from '../../themes/colors';
import { IUserRegistrationProps } from '../../interfaces/User';

const initialState: IUserRegistrationProps = {
  email: '',
  password: '',
  rePassword: '',
  firstName: '',
  lastName: ''
}

const RegistrationForm = () => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const [registrationForm, setRegistrationForm] = useState<IUserRegistrationProps>(initialState);

  return (
    <FormContainer>
      <FormView>
        <FormTitle>Sign Up</FormTitle>
        <FormRow>
          <TextInput
            value={registrationForm.email}
            placeholder='Email Address'
            autoCapitalize='none'
            onChangeText={text => setRegistrationForm({...registrationForm, email: text})} />
        </FormRow>
        <FormRow>
          <TextInput 
            value={registrationForm.password}
            placeholder='Password'
            autoCapitalize='none'
            secureTextEntry={true}
            onChangeText={text => setRegistrationForm({...registrationForm, password: text})} />
        </FormRow>
        <FormRow>
          <TextInput 
            value={registrationForm.rePassword}
            placeholder='Retype Password'
            autoCapitalize='none'
            secureTextEntry={true}
            onChangeText={text => setRegistrationForm({...registrationForm, rePassword: text})} />
        </FormRow>
        <FormRow>
          <TextInput
            value={registrationForm.firstName}
            placeholder='First name'
            onChangeText={text => setRegistrationForm({...registrationForm, firstName: text})} />
        </FormRow>
        <FormRow>
          <TextInput
            value={registrationForm.lastName}
            placeholder='Last name'
            onChangeText={text => setRegistrationForm({...registrationForm, lastName: text})} />
        </FormRow>
        <FormRow style={{marginTop: 10}}>
          <Button color='secondary'>
            Create Account
          </Button>
        </FormRow>
      </FormView>
      <FormFooter>
        <Text style={styles.footerText}>Already have an account?</Text>
        <Button
          onPress={() => navigation.navigate('Login')}>
          Sign In
        </Button>
      </FormFooter>
    </FormContainer>
  );
};

const styles = StyleSheet.create({
  footerText: {
    textAlign: 'center',
    color: colors.white,
    marginBottom: 10
  }
});

export default RegistrationForm;