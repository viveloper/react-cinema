import React from 'react';
import classes from './TicketingContainer.module.css';

const TicketingContainer = ({ children }) => {
  return (
    <div className={classes['ticketing-container']}>
      <div className={classes['ticketing-center']}>{children}</div>
    </div>
  );
};

export default TicketingContainer;
