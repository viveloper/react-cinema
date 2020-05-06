import React from 'react';
import ViewGradeIcon from '../ViewGradeIcon';
import classes from './ResultView.module.css';

import { getViewGradeIconOptions } from '../../util';

const ResultView = ({ playSeqs }) => {
  const playSeq = playSeqs[0];
  const viewGradeIconOptions = getViewGradeIconOptions(playSeq.ViewGradeCode);
  return (
    <div className={classes['result-view']}>
      <div className={classes['group-movie-time']}>
        <div className={classes['movie-time-title']}>
          <ViewGradeIcon
            size={22}
            color={viewGradeIconOptions.color}
            text={viewGradeIconOptions.text}
          />
          <span className={classes['movie-name']}>{playSeq.MovieNameKR}</span>
        </div>
      </div>
    </div>
  );
};

export default ResultView;
