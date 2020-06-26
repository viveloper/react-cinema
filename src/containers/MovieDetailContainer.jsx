import React from 'react';
import MovieDetail from '../components/MovieDetail';

import moviesDetail from '../data/moviesDetail.json';
import moviesReview from '../data/reviewData.json';

const MovieDetailContainer = ({ movieCode }) => {
  const [activeTab, setActiveTab] = useState('info');

  const movieDetail = moviesDetail.filter(
    (movieDetail) => movieDetail.Movie.RepresentationMovieCode === movieCode
  )[0];
  const movieReview = moviesReview.filter(
    (moviesReview) => moviesReview.RepresentationMovieCode === movieCode
  )[0];

  const carouselItems = movieDetail.Trailer.Items.filter(
    (trailer) => trailer.ImageDivisionCode === '1'
  ).map((trailer) => ({
    img: trailer.ImageURL,
  }));

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };
  return <MovieDetail />;
};

export default MovieDetailContainer;
