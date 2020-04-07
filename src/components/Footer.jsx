import React from 'react';
import classes from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={classes.footer}>
      <div className="container">
        <p className={classes.copyright}>
          COPYRIGHT &copy; CHOVA CINEMA ALL RIGHT RESERVED
        </p>
      </div>
    </footer>
  );
};

export default Footer;
