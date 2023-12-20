import * as React from 'react';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { UserPayload } from 'api/payload';
import { AuthAPI } from 'api/methods';

import Path from 'routes/paths';
import { absolutePath } from 'utils/path.utils';

import AuthForm from './AuthForm';
import { useToast } from 'hooks/useToast';

const SignUp = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [submitCount, setSubmitCount] = React.useState(0);

  const { mutate: signUp } = useMutation({
    mutationKey: ['createTask'],
    mutationFn: (data: UserPayload) => AuthAPI.signUp(data),
    onSuccess: () => {
      navigate(absolutePath(Path.Login));
      setSubmitCount((prevState) => prevState + 1);
    },
    onError: (error) => {
      toast({
        title: 'Sign Up Error',
        description: `Could not sign up. ${error.message}`,
        variant: 'destructive',
      });
      setSubmitCount((prevState) => prevState + 1);
    },
  });

  const onSubmit = (values: UserPayload) => {
    signUp(values);
  };

  return (
    <AuthForm onSubmit={onSubmit} variant='signUp' submitCount={submitCount} />
  );
};

export default SignUp;
