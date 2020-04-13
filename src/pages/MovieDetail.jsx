import React from 'react';
import queryString from 'query-string';
import Layout from '../components/Layout';
import Carousel from '../components/Carousel';

import moviesDetail from '../data/moviesDetail.json';

const MovieDetail = ({ location }) => {
  const query = queryString.parse(location.search);
  const movieCode = query.movie;
  const movieDetail = moviesDetail.filter(
    (movieDetail) => movieDetail.Movie.RepresentationMovieCode === movieCode
  )[0];
  console.log(movieDetail);

  const carouselItems = movieDetail.Trailer.Items.map((trailer) => ({
    sequence: trailer.SortSequence,
    img: trailer.ImageURL,
  }));

  return (
    <Layout theme="light">
      <section>
        <Carousel height={560} width={840} items={carouselItems} />
      </section>
    </Layout>
  );
};

export default MovieDetail;
