import React, { useState } from 'react';
import classes from './FilteringTabs.module.css';
const FilteringTabs = () => {
  const [activeTab, setActiveTab] = useState('all');
  const handleClick = (tabName) => {
    setActiveTab(tabName);
  };
  return (
    <div className={classes['filtering-tabs']}>
      <button
        className={
          activeTab === 'all'
            ? `${classes['btn-tab']} ${classes['active']}`
            : classes['btn-tab']
        }
        onClick={() => handleClick('all')}
      >
        전체
      </button>
      <button
        className={
          activeTab === 'special'
            ? `${classes['btn-tab']} ${classes['active']}`
            : classes['btn-tab']
        }
        onClick={() => handleClick('special')}
      >
        스페셜관
      </button>
    </div>
  );
};

export default FilteringTabs;
