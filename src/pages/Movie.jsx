import React from 'react';
import Layout from '../components/Layout';
import Carousel from '../components/Carousel';
import MovieList from '../components/MovieList';
import ExhibitionList from '../components/ExhibitionList';
import classes from './Movie.module.css';

import movies from '../data/movies.json';

const carouselItems = [
  {
    RepresentationMovieCode: '15684',
    img: '/img/ad/TimeFreak2.jpg',
    video: '/img/ad/TimeFreak.mp4',
  },
  {
    RepresentationMovieCode: '15676',
    img: '/img/ad/MySpy2.jpg',
    video: '/img/ad/MySpy.mp4',
  },
  {
    RepresentationMovieCode: '15688',
    img: '/img/ad/Stray2.jpg',
    video: '/img/ad/Stray.mp4',
  },
];

const Movie = () => {
  return (
    <Layout theme="light">
      <section>
        <Carousel height={420} items={carouselItems} />
      </section>

      <section className={classes['section-movie-list']}>
        <div className="center">
          <div className={classes['movie-list']}>
            <h3 className={classes['movie-list-title']}>
              현재 상영작 <strong>TOP 5</strong>
            </h3>
            <MovieList movies={movies} activeNum={5} theme="light" />
          </div>
          <div className={classes['movie-list']}>
            <h3 className={classes['movie-list-title']}>
              상영 예정작 <strong>TOP 5</strong>
            </h3>
            <MovieList movies={movies} activeNum={5} theme="light" />
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
