import React from 'react';
import Container from '../../components/Container';
import RegistrationForm from '../../components/registration/RegistrationForm';
import { useAppSelector } from '../../tools/hooks';
import Loader from '../../components/Loader';

const RegistrationScreen = () => {
  const { loading } = useAppSelector((state) => state.registration);

  return (
    <>
      <Container>
        <RegistrationForm />
      </Container>
      {loading &&
        <Loader />
      }
    </>
  );
};

export default RegistrationScreen;