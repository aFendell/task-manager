import { useEffect, useState } from 'react';
import './App.css';

interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
}

enum TaskStatus {
  OPEN = 'OPEN',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
}

function App() {
  const [tasks, setTasks] = useState<Task[] | []>([]);

  useEffect(() => {
    fetch('/api/tasks')
      .then((res) => {
        if (res.ok) return res.json();
        else throw new Error('Failed to fetch data');
      })
      .then(setTasks);
  }, []);

  return (
    <>
      <div>
        <h2>Tasks</h2>
        {tasks && (
          <ul>
            {tasks.map((task) => (
              <li key={task.id}>{task.title}</li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}

export default App;
