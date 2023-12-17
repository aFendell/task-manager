import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import { TasksAPI } from 'api/methods';
import { CreateTask } from 'api/payload';

import { Button } from 'components/ui/Button';
import Modal from 'components/ui/Modal';
import { Form } from 'components/forms/Form';
import TextField from 'components/forms/TextField';
import TextareaField from 'components/forms/TextareaField';

type Props = {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
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

const TaskForm = ({ isOpen, setIsOpen }: Props) => {
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
      setIsOpen(false);
    },
  });

  const onSubmit = (values: CreateTask) => {
    createTask(values);
  };

  const onToggleForm = (open: boolean) => {
    setIsOpen(open);
    form.reset();
  };

  return (
    <Modal
      isOpen={isOpen}
      setIsOpen={onToggleForm}
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
