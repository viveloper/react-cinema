import React from 'react';
import Exhibition from './Exhibition';
import classes from './ExhibitionList.module.css';

const ExhibitionList = () => {
  return (
    <ul className={classes.exhibitionList}>
      <li className={classes.item}>
        <Exhibition />
      </li>
      <li className={classes.item}>
        <Exhibition />
      </li>
      <li className={classes.item}>
        <Exhibition />
      </li>
    </ul>
  );
};

export default ExhibitionList;
