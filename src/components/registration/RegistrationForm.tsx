import React, { useEffect, useState } from 'react';
import { FormContainer, FormFooter, FormRow, FormTitle, FormView } from '../Form';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import TextInput from '../TextInput';
import Button from '../Button';
import Text from '../Text';
import { Alert, ScrollView, StyleSheet, View } from 'react-native';
import colors from '../../themes/colors';
import { IUserRegistrationProps } from '../../interfaces/User';
import { useAppDispatch, useAppSelector } from '../../tools/hooks';
import { clearRegistrationForm, registerUser } from '../../state/registration/registrationSlice';

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
  const { loading, status, error } = useAppSelector((state) => state.registration);
  const dispatch = useAppDispatch();

  const handleOnSubmit = () => {
    dispatch(registerUser(registrationForm));
  };

  useEffect(() => {
    if(!loading && status === 'failed' && error !== undefined) {
      Alert.alert('Registration Failed!', error, [
        {text: 'OK'}
      ]);
    } else if(!loading && status === 'success' && error === undefined) {
      Alert.alert('Registration Success!', 'You have successfully created your account.', [
        {text: 'OK', onPress: () => navigation.navigate('Login')}
      ]);
    }
  }, [loading, status, error]);

  useEffect(() => {
    return () => {
      dispatch(clearRegistrationForm())
    };
  }, []);

  return (
    <FormContainer>
      <ScrollView
        style={{flex: 1, width: '100%'}}>
        <FormView>
          <FormTitle>Sign Up</FormTitle>
          <FormRow>
            <TextInput
              value={registrationForm.email}
              placeholder='Email Address*'
              autoCapitalize='none'
              onChangeText={text => setRegistrationForm({...registrationForm, email: text})}
              editable={!loading} />
          </FormRow>
          <FormRow>
            <TextInput 
              value={registrationForm.password}
              placeholder='Password*'
              autoCapitalize='none'
              secureTextEntry={true}
              onChangeText={text => setRegistrationForm({...registrationForm, password: text})}
              editable={!loading} />
          </FormRow>
          <FormRow>
            <TextInput 
              value={registrationForm.rePassword}
              placeholder='Retype Password*'
              autoCapitalize='none'
              secureTextEntry={true}
              onChangeText={text => setRegistrationForm({...registrationForm, rePassword: text})}
              editable={!loading} />
          </FormRow>
          <FormRow>
            <TextInput
              value={registrationForm.firstName}
              placeholder='First name*'
              onChangeText={text => setRegistrationForm({...registrationForm, firstName: text})}
              editable={!loading} />
          </FormRow>
          <FormRow>
            <TextInput
              value={registrationForm.lastName}
              placeholder='Last name*'
              onChangeText={text => setRegistrationForm({...registrationForm, lastName: text})}
              editable={!loading} />
          </FormRow>
          <FormRow style={{marginTop: 10}}>
            <Button 
              color='secondary'
              onPress={() =>handleOnSubmit()}>
              Create Account
            </Button>
          </FormRow>
        </FormView>
      </ScrollView>
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