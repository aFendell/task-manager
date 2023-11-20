import * as React from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { TrashIcon, EditIcon } from 'lucide-react';

import { TasksAPI } from '@/api/methods';
import type { Task } from '../api/response';

import TaskStatusForm from './TaskStatusForm';
import { Button, ButtonProps } from './ui/Button';
import ConfirmationModal from './ui/ConfirmationModal';

const TaskItem = ({ id, title, description, status }: Task) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = React.useState(false);

  const queryClient = useQueryClient();

  const { mutate: deleteTask } = useMutation({
    mutationKey: ['deleteTask'],
    mutationFn: () => TasksAPI.deleteTask(id),
    onSuccess: () => {
      queryClient.refetchQueries({
        queryKey: ['getTasks'],
      });
    },
  });

  const onEdit = () => {
    // TODO: edit task feature
  };

  const confirmDeleteProps: ButtonProps = {
    children: 'Delete',
    onClick: () => {
      deleteTask();
      console.log('delete: ', id);

      setIsDeleteModalOpen(false);
    },
  };

  const cancelDeleteProps: ButtonProps = {
    children: 'Cancel',
    onClick: () => {
      setIsDeleteModalOpen(false);
    },
    variant: 'secondary',
  };

  return (
    <>
      <li key={id}>
        <div className='flex items-center justify-between gap-4 p-4 border border-gray-200 rounded-md'>
          <div className='flex flex-col flex-grow'>
            <h2 className='text-2xl font-semibold'>{title}</h2>
            <p>{description}</p>
          </div>
          <div className='flex flex-col'>
            <TaskStatusForm taskStatus={status} id={id} />

            <div className='flex'>
              <Button variant='ghost' onClick={() => onEdit()}>
                <EditIcon />
              </Button>
              <Button
                variant='ghost'
                onClick={() => setIsDeleteModalOpen(true)}
              >
                <TrashIcon />
              </Button>
            </div>
          </div>
        </div>
      </li>
      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        setIsOpen={setIsDeleteModalOpen}
        actions={[cancelDeleteProps, confirmDeleteProps]}
      />
    </>
  );
};

export default TaskItem;
