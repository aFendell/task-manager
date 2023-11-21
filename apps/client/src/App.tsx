import Providers from './Providers/Providers';

import Layout from './components/layout/Layout';
import TaskList from './components/screens/Home/TaskList';

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
