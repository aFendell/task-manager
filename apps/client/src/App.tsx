import './App.css';

import Providers from './Providers';
import TaskList from './components/TaskList';

const App = () => {
  return (
    <Providers>
      <main>
        <TaskList />
      </main>
    </Providers>
  );
};

export default App;
