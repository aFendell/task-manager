import { TaskStatus } from 'api/response';

type Props = {
  beforeId: string;
  column: TaskStatus;
};

const DropIndicator = ({ beforeId, column }: Props) => {
  return (
    <div
      data-before={beforeId}
      data-column={column}
      className='my-0.5 h-0.5 w-full bg-violet-400 opacity-0'
    />
  );
};
export default DropIndicator;
