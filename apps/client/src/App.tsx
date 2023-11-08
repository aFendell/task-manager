import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [tasks, setTasks] = useState('');

  useEffect(() => {
    fetch('/api/tasks')
      .then((res) => res.text())
      .then(setTasks);
  }, []);

  return (
    <>
      <div>
        <h1>{tasks}</h1>
        <h2>NestJS - React - Turbo</h2>
      </div>
    </>
  );
}

export default App;
