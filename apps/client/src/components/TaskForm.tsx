import * as React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { TasksAPI } from '@/api/methods';

import { Button } from './ui/Button';
import { Modal } from './ui/Modal';
import { Form } from './forms/Form';
import { CreateTask } from '@/api/payload';
import TextField from './forms/TextField';
import TextareaField from './forms/TextareaField';

type Props = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  taskId?: string;
};

const formSchema = z.object({
  title: z.string().min(2, {
    message: 'Title must be at least 2 character.',
  }),
  description: z.string().min(2, {
    message: 'Description must be at least 2 character.',
  }),
});

const defaultValues: CreateTask = {
  title: '',
  description: '',
};

const TaskForm = ({ open, setOpen }: Props) => {
  const form = useForm<CreateTask>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const queryClient = useQueryClient();

  const { mutate: createTask } = useMutation({
    mutationKey: ['createTask'],
    mutationFn: (data: CreateTask) => TasksAPI.createTask(data),
    onSuccess: () => {
      queryClient.refetchQueries({
        queryKey: ['getTasks'],
      });
      form.reset();
      setOpen(false);
    },
  });

  const onSubmit = (values: CreateTask) => {
    createTask(values);
  };

  return (
    <Modal
      open={open}
      setOpen={setOpen}
      title='Edit Task'
      body={
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
            <TextField
              name='title'
              control={form.control}
              placeholder='Task Title'
              title='Title'
            />
            <TextareaField
              name='description'
              control={form.control}
              placeholder='Task Description'
              title='Description'
            />

            <Button type='submit'>Submit</Button>
          </form>
        </Form>
      }
    />
  );
};

export default TaskForm;
