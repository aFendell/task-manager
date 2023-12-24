import { NavLink } from 'react-router-dom';
import { Button } from 'components/ui/Button';

const NotFound = () => {
  return (
    <section>
      <h1 className='text-2xl font-semibold tracking-tight'>
        The page you're looking for was not found
      </h1>
      <Button className='mt-5'>
        <NavLink to='/'>Go back</NavLink>
      </Button>
    </section>
  );
};

export default NotFound;
