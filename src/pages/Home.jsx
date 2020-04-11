import React from 'react';
import Layout from '../components/Layout';
import Carousel from '../components/Carousel';
import MovieList from '../components/MovieList';
import classes from './Home.module.css';

import movies from '../data/movies.json';

const carouselItems = [
  {
    RepresentationMovieCode: '15684',
    img: '/img/ad/TimeFreak.jpg',
    video: '/img/ad/TimeFreak.mp4',
  },
  {
    RepresentationMovieCode: '15676',
    img: '/img/ad/MySpy.jpg',
    video: '/img/ad/MySpy.mp4',
  },
  {
    RepresentationMovieCode: '15688',
    img: '/img/ad/Stray.jpg',
    video: '/img/ad/Stray.mp4',
  },
];

const Home = () => {
  return (
    <Layout>
      <section>
        <Carousel theme="dark" height={774} items={carouselItems} />
      </section>
      <section className={classes['section-movie-list']}>
        <div className="center">
          <MovieList theme="dark" movies={movies} activeNum={5} />
        </div>
      </section>
    </Layout>
  );
};

export default Home;
