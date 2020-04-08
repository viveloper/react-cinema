import React from 'react';
import Layout from '../components/Layout';
import Carousel from '../components/Home/Carousel';
import MovieList from '../components/Home/MovieList';

const Home = () => {
  return (
    <Layout>
      <Carousel />
      <MovieList />
    </Layout>
  );
};

export default Home;
