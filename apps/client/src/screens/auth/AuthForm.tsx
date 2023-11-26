import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { UserPayload } from '@/api/payload';

import { Form } from '@/components/forms/Form';
import TextField from '@/components/forms/TextField';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

type Props = {
  onSubmit: (values: UserPayload) => void;
  variant: 'signUp' | 'login';
};

const formSchema = z.object({
  username: z.string().min(2, {
    message: 'Username must be at least 4 characters.',
  }),
  password: z.string().min(2, {
    message: 'Password must be at least 8 characters.',
  }),
});

const defaultValues: UserPayload = {
  username: '',
  password: '',
};

const AuthForm = ({ onSubmit, variant }: Props) => {
  const form = useForm<UserPayload>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  return (
    <Card className='mx-auto w-96'>
      <CardHeader>{variant === 'signUp' ? 'Sign Up' : 'Login'}</CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='flex flex-col space-y-8'
          >
            <TextField
              name='username'
              control={form.control}
              placeholder='Username'
              title='Username'
            />
            <TextField
              name='password'
              control={form.control}
              placeholder='Password'
              title='Password'
            />
            <Button type='submit'>
              {variant === 'signUp' ? 'Sign Up' : 'Login'}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default AuthForm;
