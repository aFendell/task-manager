import * as React from 'react';
import { Flame, Trash } from 'lucide-react';

import { cn } from 'lib/utils';
import useDeleteTask from 'hooks/useDeleteTask';

const BurnZone = () => {
  const [isActive, setIsActive] = React.useState(false);

  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsActive(true);
  };

  const onDragLeave = () => {
    setIsActive(false);
  };

  const { deleteTask } = useDeleteTask();

  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    const itemId = e.dataTransfer.getData('itemId');
    console.log(itemId);
    deleteTask(itemId);
    setIsActive(false);
  };

  return (
    <div
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      className={cn(
        'mt-10 grid h-56 w-56 shrink-0 place-content-center rounded border text-xl',
        isActive
          ? 'border-red-800 bg-red-800/20 text-red-500'
          : 'border-neutral-500 bg-neutral-500/20 text-neutral-500',
      )}
    >
      {isActive ? (
        <Flame className='pointer-events-none animate-bounce' />
      ) : (
        <Trash className='pointer-events-none' />
      )}
    </div>
  );
};

export default BurnZone;
