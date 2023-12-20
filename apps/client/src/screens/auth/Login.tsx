import * as React from 'react';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { setHeaderToken } from 'api/axiosClient';
import { UserPayload } from 'api/payload';
import { AuthAPI } from 'api/methods';
import { Auth } from 'api/response';

import Path from 'routes/paths';
import { absolutePath } from 'utils/path.utils';
import useAuthContext from 'hooks/useAuthContext';
import AuthForm from './AuthForm';
import { useToast } from 'hooks/useToast';

const Login = () => {
  const [submitCount, setSubmitCount] = React.useState(0);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { setAuth } = useAuthContext();

  const onSuccess = (data: Auth) => {
    setAuth(data);
    setHeaderToken(data.accessToken);
    navigate(absolutePath(Path.Tasks));
    setSubmitCount((prevState) => prevState + 1);
  };

  const onError = (error: Error) => {
    toast({
      title: 'Login Error',
      description: `Could not login. ${error.message}`,
      variant: 'destructive',
    });
    setAuth(null);
    setHeaderToken();
    navigate(absolutePath(Path.Login));
    setSubmitCount((prevState) => prevState + 1);
  };

  const { mutate: login } = useMutation({
    mutationKey: ['createTask'],
    mutationFn: (data: UserPayload) => AuthAPI.login(data),
    onSuccess: (data: Auth) => onSuccess(data),
    onError: (error) => onError(error),
  });

  const onSubmit = (values: UserPayload) => {
    login(values);
  };

  return (
    <AuthForm onSubmit={onSubmit} variant='login' submitCount={submitCount} />
  );
};

export default Login;
