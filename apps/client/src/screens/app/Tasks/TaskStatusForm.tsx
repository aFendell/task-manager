import * as React from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { TasksAPI } from '@/api/methods';
import { UpdateTaskStatus } from '@/api/payload';

import { TaskStatus } from '@/api/types';
import { Form } from '../../../components/forms/Form';
import SelectField from '../../../components/forms/SelectField';

const FormSchema = z.object({
  status: z.nativeEnum(TaskStatus),
});

const taskStatusOptions = Object.values(TaskStatus).map((value) => ({
  value,
  label: value.replace(/_/g, ' '),
}));

type Props = {
  id: string;
  taskStatus: TaskStatus;
};

const TaskStatusForm = ({ id, taskStatus }: Props) => {
  const form = useForm<UpdateTaskStatus>({
    resolver: zodResolver(FormSchema),
    defaultValues: { status: taskStatus },
  });

  const queryClient = useQueryClient();

  const { mutate: updateStatus } = useMutation({
    mutationKey: ['updateTaskStatus'],
    mutationFn: (data: UpdateTaskStatus) => TasksAPI.updateTaskStatus(id, data),
    onSuccess: (task) => {
      queryClient.setQueryData(['getTasks', id], task);
    },
  });

  const onSubmit = React.useCallback(
    (values: UpdateTaskStatus) => {
      updateStatus(values);
    },
    [updateStatus],
  );

  const currentStatus = form.watch('status');

  React.useEffect(() => {
    if (currentStatus !== undefined) {
      form.handleSubmit(onSubmit)();
    }
  }, [form, onSubmit, currentStatus]);

  return (
    <Form {...form}>
      <form className={`flex w-2/3 space-y-6 text-left`}>
        <SelectField
          items={taskStatusOptions}
          name='status'
          control={form.control}
          withIcon={false}
          defaultValue={currentStatus}
        />
      </form>
    </Form>
  );
};

export default TaskStatusForm;
