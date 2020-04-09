import React, { useState } from 'react';
import classes from './MovieList.module.css';

const ACTIVE_MOVIE_LIST_LEN = 5;

const MovieList = ({ movies, limit, theme }) => {
  const [startActiveIndex, setStartActiveIndex] = useState(0);

  const handlePrevClick = () => {
    setStartActiveIndex(startActiveIndex - 1);
  };
  const handleNextClick = () => {
    setStartActiveIndex(startActiveIndex + 1);
  };

  return (
    <section
      className={`${classes.movieList} ${
        theme === 'light' ? classes.light : ''
      }`}
    >
      <div className={classes.container}>
        <div className={classes.nav}>
          <button
            onClick={handlePrevClick}
            className={startActiveIndex <= 0 ? classes.hide : ''}
          >
            <span className={classes.prev}>
              <i className="fas fa-angle-left fa-2x"></i>
            </span>
          </button>
          <button
            onClick={handleNextClick}
            className={
              startActiveIndex + ACTIVE_MOVIE_LIST_LEN >= limit
                ? classes.hide
                : ''
            }
          >
            <span className={classes.next}>
              <i className="fas fa-angle-right fa-2x"></i>
            </span>
          </button>
        </div>
        <div className={classes.listContianer}>
          <ul
            className={classes.movies}
            style={{ transform: `translateX(${startActiveIndex * -199}px)` }}
          >
            {movies.slice(0, limit).map((movie, index) => {
              return (
                <li
                  key={movie.RepresentationMovieCode}
                  className={classes.movie}
                >
                  <div className={classes.card}>
                    <div className={classes.imgContainer}>
                      <img src={movie.PosterURL} alt="poster" />
                      <em className={classes.index}>{index + 1}</em>
                      <div className={classes.hoverLayer}>
                        <a href="#">예매하기</a>
                        <a href="#">상세정보</a>
                      </div>
                    </div>
                    <div className={classes.info}>
                      <p className={classes.title}>{movie.MovieNameKR}</p>
                      <div className={classes.subInfo}>
                        <span className={classes.rate}>
                          예매율 {movie.BookingRate.toFixed(1)}%
                        </span>
                        {movie.DDay > 0 ? (
                          <span
                            className={classes.dday}
                          >{`D-${movie.DDay}`}</span>
                        ) : (
                          <span className={classes.star}>
                            <span className={classes.icon}>
                              <i className="fas fa-star"></i>
                            </span>{' '}
                            <span>{movie.ViewEvaluation}</span>
                          </span>
                        )}
                        <span className={classes.heart}>
                          <i className="fab fa-gratipay"></i>
                        </span>
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default MovieList;
