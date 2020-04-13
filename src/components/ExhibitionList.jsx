import React from 'react';
import Movies from './Movies';
import classes from './ExhibitionList.module.css';

import movieData from '../data/movies.json';

const movies = movieData.Movies.Items[0].Items;

const ExhibitionList = () => {
  return (
    <div className={classes.exhibitionList}>
      <li className={`${classes.exhibition} ${classes.arte}`}>
        <div className={classes.info}>
          <div className={classes.description}>
            감성을 적시는
            <br />
            아트&컬쳐
          </div>
          <a href="#">아르떼 바로가기 ></a>
        </div>
        <Movies movies={movies.slice(2, 5)} activeNum={1} theme="light" />
      </li>
      <li className={`${classes.exhibition} ${classes.opera}`}>
        <div className={classes.info}>
          <div className={classes.description}>
            스크린에서 보는
            <br />
            해외명작
          </div>
          <a href="#">오페라 바로가기 ></a>
        </div>
        <Movies movies={movies.slice(11, 12)} activeNum={1} theme="light" />
      </li>
      <li className={`${classes.exhibition} ${classes.festival}`}>
        <div className={classes.info}>
          <div className={classes.description}>
            초바시네마의
            <br />
            인생영화
          </div>
          <a href="#"></a>
        </div>
        <div className={classes.commingSoon}>
          <div>comming soon</div>
          <span>준비중입니다.</span>
        </div>
      </li>
    </div>
  );
};

export default ExhibitionList;
