import React from 'react';
import Header from './Header';
import Footer from './Footer';

const Layout = ({ children, theme }) => {
  return (
    <>
      <Header theme={theme} />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
