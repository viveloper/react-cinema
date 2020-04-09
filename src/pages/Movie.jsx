import React, { useState } from 'react';
import Layout from '../components/Layout';
import Carousel from '../components/Carousel';
import MovieList from '../components/MovieList';

import movies from '../data/movies.json';

const carouselItems = [
  {
    RepresentationMovieCode: '15684',
    img: 'http://localhost:3000/adImg/TimeFreak2.jpg',
    video: 'http://localhost:3000/adImg/TimeFreak.mp4',
  },
  {
    RepresentationMovieCode: '15676',
    img: 'http://localhost:3000/adImg/MySpy2.jpg',
    video: 'http://localhost:3000/adImg/MySpy.mp4',
  },
  {
    RepresentationMovieCode: '15688',
    img: 'http://localhost:3000/adImg/Stray2.jpg',
    video: 'http://localhost:3000/adImg/Stray.mp4',
  },
];

const Movie = () => {
  return (
    <Layout theme="light">
      <Carousel height={420} items={carouselItems} />
      <MovieList movies={movies} limit={5} theme="light" />
    </Layout>
  );
};

export default Movie;
