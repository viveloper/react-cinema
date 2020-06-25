import React, { useState, useEffect } from 'react';

import Layout from '../components/Layout';
import MovieListContainer from '../containers/MovieListContainer';

const _movies = movieData.Movies.Items[0].Items;
const ONE_PAGE_ITEM_NUM = 15;

const MovieList = ({ history, match }) => {
  const params = match.params;

  const [sortType, setSortType] = useState('');
  const [movies, setMovies] = useState([]);
  const [pageOffset, setPageOffset] = useState(1);
  const [visibleMoreButton, setVisibleMoreButton] = useState(false);

  useEffect(() => {
    const getInitSortType = () => {
      return params.type === 'current' ? 'ticketing' : 'release';
    };
    setSortType(getInitSortType);
  }, [params.type]);

  useEffect(() => {
    const getMovies = () => {
      if (params.type === 'current') {
        const currentMovies = _movies
          .filter((movie) => parseInt(movie.DDay) === 0)
          .sort((a, b) => {
            if (sortType === 'ticketing') {
              return b.BookingRate - a.BookingRate;
            } else if (sortType === 'grade') {
              return b.ViewEvaluation - a.ViewEvaluation;
            } else if (sortType === 'review') {
              return b.BookingRate - a.BookingRate;
            } else if (sortType === 'wish') {
              return b.BookingRate - a.BookingRate;
            } else {
              return [];
            }
          });
        return currentMovies;
      } else {
        const preMovies = _movies
          .filter((movie) => parseInt(movie.DDay) > 0)
          .sort((a, b) => {
            if (sortType === 'release') {
              const year_a = a.ReleaseDate.split(' ')[0].split('-')[0];
              const month_a = a.ReleaseDate.split(' ')[0].split('-')[1];
              const day_a = a.ReleaseDate.split(' ')[0].split('-')[2];
              const year_b = b.ReleaseDate.split(' ')[0].split('-')[0];
              const month_b = b.ReleaseDate.split(' ')[0].split('-')[1];
              const day_b = b.ReleaseDate.split(' ')[0].split('-')[2];
              return (
                Date.UTC(year_a, month_a, day_a) -
                Date.UTC(year_b, month_b, day_b)
              );
            } else if (sortType === 'ticketing') {
              return b.BookingRate - a.BookingRate;
            } else if (sortType === 'wish') {
              const year_a = a.ReleaseDate.split(' ')[0].split('-')[0];
              const month_a = a.ReleaseDate.split(' ')[0].split('-')[1];
              const day_a = a.ReleaseDate.split(' ')[0].split('-')[2];
              const year_b = b.ReleaseDate.split(' ')[0].split('-')[0];
              const month_b = b.ReleaseDate.split(' ')[0].split('-')[1];
              const day_b = b.ReleaseDate.split(' ')[0].split('-')[2];
              return (
                Date.UTC(year_a, month_a, day_a) -
                Date.UTC(year_b, month_b, day_b)
              );
            } else {
              return [];
            }
          });
        return preMovies;
      }
    };
    const totalMovies = getMovies();
    const paginationMovies = totalMovies.slice(
      0,
      ONE_PAGE_ITEM_NUM * pageOffset
    );
    setMovies(paginationMovies);
    if (pageOffset * ONE_PAGE_ITEM_NUM < totalMovies.length) {
      setVisibleMoreButton(true);
    } else {
      setVisibleMoreButton(false);
    }
  }, [params.type, sortType, pageOffset]);

  const handleListTypeBtnClick = (type) => {
    if (params.type === type) return;
    history.push(`/movies/${type}`);
    setPageOffset(1);
  };

  const handleSortTypeBtnClick = (type) => {
    if (type === sortType) return;
    setSortType(type);
    setPageOffset(1);
  };

  const handleMoreClick = () => {
    setPageOffset(pageOffset + 1);
  };

  return (
    <Layout theme="light">
      <MovieListContainer />
    </Layout>
  );
};

export default MovieList;
