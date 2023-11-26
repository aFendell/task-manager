import { UserPayload } from '@/api/payload';
import AuthForm from './AuthForm';

const SignUp = () => {
  const onSubmit = (values: UserPayload) => {
    console.log(values);
  };

  return <AuthForm onSubmit={onSubmit} variant='signUp' />;
};

export default SignUp;
