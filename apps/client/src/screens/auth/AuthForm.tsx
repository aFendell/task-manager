import * as React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import * as Payload from 'api/payload';

import { Form } from 'components/forms/Form';
import TextField from 'components/forms/TextField';
import { Button } from 'components/ui/Button';
import { Card, CardContent, CardHeader } from 'components/ui/Card';

type Props = {
  onSubmit: (values: Payload.UserPayload) => void;
  variant: 'signUp' | 'login';
  submitCount: number;
};

const formSchema = z.object({
  username: z.string().min(4, {
    message: 'Username must be at least 4 characters.',
  }),
  password: z
    .string()
    .min(8, {
      message: 'Password must be at least 8 characters.',
    })
    .refine((password) => /[A-Z]/.test(password), {
      message: 'Password must contain at least one uppercase letter',
    })
    .refine((password) => /[a-z]/.test(password), {
      message: 'Password must contain at least one lowercase letter',
    })
    .refine((password) => /\d/.test(password), {
      message: 'Password must contain at least one number',
    }),
});

const defaultValues: Payload.UserPayload = {
  username: '',
  password: '',
};

const AuthForm = ({ onSubmit, variant, submitCount }: Props) => {
  const form = useForm<Payload.UserPayload>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  React.useEffect(() => {
    if (submitCount !== 0) {
      form.reset();
    }
  }, [form, submitCount]);

  return (
    <Card className='mx-auto w-full max-w-96'>
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
