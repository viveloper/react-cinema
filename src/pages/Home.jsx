import React from 'react';
import Layout from '../components/Layout';
import Carousel from '../components/Carousel';
import MovieList from '../components/MovieList';

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
      <Carousel theme="gradient" height={774} items={carouselItems} />
      <MovieList movies={movies} limit={21} />
    </Layout>
  );
};

export default Home;
