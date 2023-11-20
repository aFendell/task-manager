import React from 'react';
import Header from './Header';
import Footer from './Footer';

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <div className='min-h-screen flex flex-col overflow-x-hidden'>
      <Header />
      <main className='py-4 px-8 flex flex-col flex-1 max-w-screen-lg container mx-auto'>
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
