import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { UserPayload } from '@/api/payload';
import { AuthAPI } from '@/api/methods';
import { Token } from '@/api/response';
import Path from '@/routes/paths';
import { absolutePath } from '@/utils/path.utils';
import useAuthContext from '@/hooks/useAuthContext';
import AuthForm from './AuthForm';
import { setHeaderToken } from '@/api/axiosClient';

const Login = () => {
  const navigate = useNavigate();
  const { setAuth } = useAuthContext();

  const { mutate: login, isSuccess } = useMutation({
    mutationKey: ['createTask'],
    mutationFn: (data: UserPayload) => AuthAPI.login(data),
    onSuccess: (data: Token) => {
      console.log(data.accessToken);
      setAuth(data);
      setHeaderToken(data.accessToken);
      navigate(absolutePath(Path.Tasks));
    },
    onError: (error) => {
      // TODO: add error notification
      console.log('login error: ', error);
    },
  });

  const onSubmit = (values: UserPayload) => {
    login(values);
  };

  return (
    <AuthForm onSubmit={onSubmit} variant='login' isSubmitSuccess={isSuccess} />
  );
};

export default Login;
