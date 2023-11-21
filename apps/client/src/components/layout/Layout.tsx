import Header from './Header';
import Footer from './Footer';

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <div className='flex min-h-screen flex-col overflow-x-hidden'>
      <Header />
      <main className='py container mx-auto flex max-w-screen-lg flex-1 flex-col px-8 py-10'>
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
