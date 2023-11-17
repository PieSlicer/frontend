import { ReactNode } from 'react';
import Header from './Header';
import CustomFooter from './Footer';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header/>
      <main>
        <div className='min-h-screen md:m-10'>
          {children}
        </div>
      </main>
      <CustomFooter/>
    </>
  );
}