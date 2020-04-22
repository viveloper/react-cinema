import React from 'react';
import classes from './Step01.module.css';

const Step01 = ({ children }) => {
  return (
    <div className={`${classes['step-content']} ${classes['step1']}`}>
      {children}
    </div>
  );
};

export default Step01;
