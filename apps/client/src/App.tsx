import Providers from './Providers';
import TaskList from './components/TaskList';
import Layout from './components/layout/Layout';

const App = () => {
  return (
    <Providers>
      <Layout>
        <TaskList />
      </Layout>
    </Providers>
  );
};

export default App;
