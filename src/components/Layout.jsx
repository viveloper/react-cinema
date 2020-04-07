import React from 'react';
import Header from './Header';

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <main>{children}</main>
      <footer>
        <div className="container">
          <h1>footer</h1>
        </div>
      </footer>
    </>
  );
};

export default Layout;
