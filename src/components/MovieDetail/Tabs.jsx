import React from 'react';
import classes from './Tabs.module.css';

const Tabs = ({ activeTab, onTabClick }) => {
  return (
    <div className={classes['tabs']}>
      <button
        className={`${classes['tab']} ${
          activeTab === 'info' ? classes['active'] : ''
        }`}
        onClick={() => onTabClick('info')}
      >
        영화정보
      </button>
      <button
        className={`${classes['tab']} ${
          activeTab === 'review' ? classes['active'] : ''
        }`}
        onClick={() => onTabClick('review')}
      >
        평점 및 관람평
      </button>
    </div>
  );
};

export default Tabs;
