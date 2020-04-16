import React from 'react';
import { Link } from 'react-router-dom';

import Movies from '../Movies';

import classes from './Top5Movies.module.css';

const Top5Movies = ({ title, movies, type }) => {
  return (
    <div className={classes['movie-list']}>
      <div className="center">
        <div className={classes['header']}>
          <h3 className={classes['title']}>
            {title} <strong>TOP 5</strong>
          </h3>
          <Link to={`/movie/list?type=${type}`}>더보기 ></Link>
        </div>
        <Movies movies={movies} activeNum={5} theme="light" />
      </div>
    </div>
  );
};

export default Top5Movies;
