import { Task } from '../api/response';

type Props = Task & {
  onDelete: (id: string) => void;
};

const TaskItem = ({ id, title, description, status, onDelete }: Props) => {
  return (
    <li key={id}>
      <div
        style={{
          padding: '20px',
          margin: '10px',
          backgroundColor: '#c5c5c5',
          borderRadius: '4px',
        }}
      >
        <h2>{title}</h2>
        <p>{description}</p>
        <span>{status}</span>
        <button onClick={() => onDelete(id)}>Delete</button>
      </div>
    </li>
  );
};

export default TaskItem;
