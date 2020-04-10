import React from 'react';
import Layout from '../components/Layout';
import Carousel from '../components/Carousel';
import MovieList from '../components/MovieList';
import classes from './Home.module.css';

import movies from '../data/movies.json';

const carouselItems = [
  {
    RepresentationMovieCode: '15684',
    img: 'http://localhost:3000/adImg/TimeFreak.jpg',
    video: 'http://localhost:3000/adImg/TimeFreak.mp4',
  },
  {
    RepresentationMovieCode: '15676',
    img: 'http://localhost:3000/adImg/MySpy.jpg',
    video: 'http://localhost:3000/adImg/MySpy.mp4',
  },
  {
    RepresentationMovieCode: '15688',
    img: 'http://localhost:3000/adImg/Stray.jpg',
    video: 'http://localhost:3000/adImg/Stray.mp4',
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
