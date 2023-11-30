import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { UserPayload } from '@/api/payload';
import { AuthAPI } from '@/api/methods';

import Path from '@/routes/paths';
import { absolutePath } from '@/utils/path.utils';

import AuthForm from './AuthForm';

const SignUp = () => {
  const navigate = useNavigate();

  const { mutate: signUp, isSuccess } = useMutation({
    mutationKey: ['createTask'],
    mutationFn: (data: UserPayload) => AuthAPI.signUp(data),
    onSuccess: () => {
      navigate(absolutePath(Path.Login));
    },
  });

  const onSubmit = (values: UserPayload) => {
    signUp(values);
  };

  return (
    <AuthForm
      onSubmit={onSubmit}
      variant='signUp'
      isSubmitSuccess={isSuccess}
    />
  );
};

export default SignUp;
