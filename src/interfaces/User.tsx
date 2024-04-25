export interface IUserProps {
  email: string;
  firstName: string;
  lastName: string;
}

export interface IUserLoginProps {
  email: string;
  password: string;
}

export interface IUserRegistrationProps extends IUserProps {
  password: string;
  rePassword: string;
}