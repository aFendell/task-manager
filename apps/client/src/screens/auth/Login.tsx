import { UserPayload } from '@/api/payload';
import AuthForm from './AuthForm';

const Login = () => {
  const onSubmit = (values: UserPayload) => {
    console.log(values);
  };

  return <AuthForm onSubmit={onSubmit} variant='login' />;
};

export default Login;
