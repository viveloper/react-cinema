import React from 'react';
import Layout from '../components/Layout';
import Carousel from '../components/Carousel';
import Movies from '../components/Movies';
import classes from './Home.module.css';

import movieData from '../data/movies.json';
import carouselItems from '../data/carouselItems01';

const movies = movieData.Movies.Items[0].Items;

const Home = () => {
  return (
    <Layout>
      <section>
        <Carousel theme="dark" height={774} items={carouselItems} />
      </section>
      <section className={classes['section-movie-list']}>
        <div className="center">
          <Movies theme="dark" movies={movies} activeNum={5} />
        </div>
      </section>
    </Layout>
  );
};

export default Home;
