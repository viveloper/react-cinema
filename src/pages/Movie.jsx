import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import Carousel from '../components/Carousel';
import Movies from '../components/Movies';
import ExhibitionList from '../components/ExhibitionList';
import classes from './Movie.module.css';

import movies from '../data/movies.json';
import carouselItems from '../data/carouselItems02';

const Movie = () => {
  const top5CurrentMovie = movies
    .filter((movie) => parseInt(movie.DDay) === 0)
    .slice(0, 5);
  const top5PreMovie = movies
    .filter((movie) => parseInt(movie.DDay) > 0)
    .slice(0, 5);
  return (
    <Layout theme="light">
      <section>
        <Carousel height={420} items={carouselItems} />
      </section>

      <section className={classes['section-movie-list']}>
        <div className="center">
          <div className={classes['movie-list']}>
            <div className={classes['movie-list-header']}>
              <h3 className={classes['title']}>
                현재 상영작 <strong>TOP 5</strong>
              </h3>
              <Link to="/movie/list?type=current">더보기 ></Link>
            </div>
            <Movies movies={top5CurrentMovie} activeNum={5} theme="light" />
          </div>
          <div className={classes['movie-list']}>
            <div className={classes['movie-list-header']}>
              <h3 className={classes['title']}>
                상영 예정작 <strong>TOP 5</strong>
              </h3>
              <Link to="/movie/list?type=pre">더보기 ></Link>
            </div>
            <Movies movies={top5PreMovie} activeNum={5} theme="light" />
          </div>
        </div>
      </section>

      <section className={classes['section-exhibition']}>
        <div className="center">
          <ExhibitionList />
        </div>
      </section>
    </Layout>
  );
};

export default Movie;
