import React from 'react';
import Layout from '../components/Layout';
import Carousel from '../components/Carousel';
import SectionMovies from '../components/Home/SectionMovies';
import Movies from '../components/Movies';

import movieData from '../data/movies.json';
import carouselItems from '../data/carouselItems01';

const movies = movieData.Movies.Items[0].Items;

const Home = () => {
  return (
    <Layout>
      <Carousel theme="dark" height={774} items={carouselItems} />
      <SectionMovies>
        <Movies theme="dark" movies={movies} activeNum={5} />
      </SectionMovies>
    </Layout>
  );
};

export default Home;
