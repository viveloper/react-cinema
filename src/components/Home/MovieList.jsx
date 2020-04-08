import React from 'react';
import classes from './MovieList.module.css';
import movies from '../../data/movies.json';

const MovieList = () => {
  console.log(movies);

  return (
    <section className={classes.movieList}>
      <div className={classes.container}>
        <ul className={classes.cards}>
          {movies.slice(0, 21).map((movie) => {
            return (
              <li key={movie.RepresentationMovieCode}>
                <div className={classes.card}>
                  <div className={classes.imgContainer}>
                    <img src={movie.PosterURL} alt="poster" />
                  </div>
                  <div className={classes.info}>
                    <p className={classes.title}>{movie.MovieNameKR}</p>
                    <div className={classes.subInfo}>
                      <span className={classes.rate}>{movie.BookingRate}</span>
                      <span className={classes.star}>
                        {movie.ViewEvaluation}
                      </span>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default MovieList;
