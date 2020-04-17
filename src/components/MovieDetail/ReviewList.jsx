import React, { useState } from 'react';
import classes from './ReviewList.module.css';
import { numberWithCommas } from '../../util';

const ReviewList = ({ items, total }) => {
  const [sortType, setSortType] = useState('recent');
  const handleSortBtnClick = (type) => {
    setSortType(type);
  };
  return (
    <div className={classes['review-list']}>
      <div className={classes['header']}>
        <span className={classes['total']}>{`총 ${numberWithCommas(
          total
        )}건`}</span>
        <div>
          <button
            className={sortType === 'recent' ? classes['active'] : ''}
            onClick={() => handleSortBtnClick('recent')}
          >
            최신순
          </button>
          <button
            className={sortType === 'like' ? classes['active'] : ''}
            onClick={() => handleSortBtnClick('like')}
          >
            공감순
          </button>
        </div>
      </div>
      <ul className={classes['items']}>
        {/* {items.map((item) => (
          <li></li>
        ))} */}
      </ul>
    </div>
  );
};

export default ReviewList;
