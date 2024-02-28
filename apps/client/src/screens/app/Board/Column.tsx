import * as React from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { cn } from 'lib/utils';
import { Task, TaskStatus, TasksList } from 'api/response';
import { UpdateTaskStatus } from 'api/payload';
import { TasksAPI } from 'api/methods';

import Card from './Card';
import DropIndicator from './DropIndicator';
import AddCard from './AddCard';

type Props = {
  title: string;
  headingColor: string;
  column: TaskStatus;
  items: TasksList;
};

const Column = ({ title, headingColor, column, items }: Props) => {
  const [isActive, setIsActive] = React.useState(false);
  const queryClient = useQueryClient();

  const onDragStart = (
    e: MouseEvent | TouchEvent | PointerEvent,
    itemId: string,
  ) => {
    const dragEvenet = e as unknown as React.DragEvent;
    dragEvenet.dataTransfer.setData('itemId', itemId);
  };

  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    highlightIndicator(e);
    setIsActive(true);
  };

  const highlightIndicator = (e: React.DragEvent<HTMLDivElement>) => {
    const indicators = getIndicators();
    clearHighlights(indicators);
    const el = getNearestIndicator(e, indicators);
    el.element.style.opacity = '1';
  };

  const clearHighlights = (elements?: HTMLDivElement[]) => {
    const indicators = elements || getIndicators();

    indicators.forEach((indicator) => (indicator.style.opacity = '0'));
  };

  const getNearestIndicator = (
    e: React.DragEvent<HTMLDivElement>,
    indicators: HTMLDivElement[],
  ) => {
    const DISTANCE_OFFSET = 50;
    const el = indicators.reduce(
      (closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = e.clientY - (box.top + DISTANCE_OFFSET);

        if (offset < 0 && offset > closest.offset) {
          return { offset: offset, element: child };
        } else {
          return closest;
        }
      },
      {
        offset: Number.NEGATIVE_INFINITY,
        element: indicators[indicators.length - 1],
      },
    );

    return el;
  };

  const getIndicators = (): HTMLDivElement[] => {
    return Array.from(document.querySelectorAll(`[data-column="${column}"]`));
  };

  const onDragLeave = () => {
    setIsActive(false);
    clearHighlights();
  };

  const { mutate: updateStatus } = useMutation({
    mutationKey: ['updateTaskStatus'],
    mutationFn: ({ id, data }: { id: string; data: UpdateTaskStatus }) =>
      TasksAPI.updateTaskStatus(id, data),
    onMutate: async ({ id, data }) => {
      console.log(id, data);

      await queryClient.cancelQueries({ queryKey: ['getTasks'] });

      const previousTasks = queryClient.getQueryData<TasksList>(['getTasks']);
      console.log('previousTasks:', previousTasks);

      queryClient.setQueryData<Task[]>(['getTasks'], (oldTasks) =>
        oldTasks?.map((task) =>
          task.id === id ? { ...task, status: data.status } : task,
        ),
      );

      return { previousTasks };
    },
    onError: (_error, _variables, context) => {
      queryClient.setQueryData(['getTasks'], context?.previousTasks);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['getTasks'] });
    },
  });

  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    setIsActive(false);
    clearHighlights();

    const itemId = e.dataTransfer.getData('itemId');

    const indicators = getIndicators();
    const { element } = getNearestIndicator(e, indicators);
    const before = element.dataset.before || '-1';

    updateStatus({ id: itemId, data: { status: column } });

    if (before !== itemId) {
      let newItems = [...items];

      let itemToTransfer = newItems.find((item) => item.id === itemId);
      if (!itemToTransfer) return;

      itemToTransfer = { ...itemToTransfer, status: column };

      newItems = newItems.filter((card) => card.id !== itemId);

      const moveToBack = before === '-1';

      if (moveToBack) {
        newItems.push(itemToTransfer);
      } else {
        const insertAtIndex = newItems.findIndex((item) => item.id === before);
        if (insertAtIndex === undefined) return;

        newItems.splice(insertAtIndex, 0, itemToTransfer);
      }
    }
  };

  const filteredItems = items.filter((item) => item.status === column);

  return (
    <div className='block w-1/3 min-w-[14rem] max-w-xs shrink-0'>
      <div className='mb-3 flex items-center justify-between'>
        <h3 className={cn('font-medium', headingColor)}>{title}</h3>
        <span className='rounded text-sm text-neutral-400'>
          {items?.length ?? 0}
        </span>
      </div>
      <div
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        className={cn(
          'h-full w-full transition-colors',
          isActive ? 'bg-neutral-800/50' : 'bg-neutral-800/0',
        )}
      >
        <ul>
          {filteredItems?.map((item) => (
            <li key={item.id}>
              <Card {...item} onDragStart={onDragStart} />
            </li>
          ))}
          <DropIndicator beforeId='-1' column={column} />
          <AddCard column={column} />
        </ul>
      </div>
    </div>
  );
};

export default Column;
