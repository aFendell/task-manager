import { useMutation, useQueryClient } from '@tanstack/react-query';
import { TasksAPI } from 'api/methods';
import { toast } from './useToast';

const useDeleteTask = () => {
  const queryClient = useQueryClient();

  const { mutate: deleteTask } = useMutation({
    mutationKey: ['deleteTask'],
    mutationFn: (id: string) => TasksAPI.deleteTask(id),
    onSuccess: () => {
      queryClient.refetchQueries({
        queryKey: ['getTasks'],
      });
    },
    onError: (error) => {
      toast({
        title: 'Delete Error',
        description: `Could not delete task. ${error.message}`,
        variant: 'destructive',
      });
    },
  });

  return { deleteTask };
};

export default useDeleteTask;
