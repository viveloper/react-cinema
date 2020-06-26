import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import MovieList from '../components/MovieList';
import { getCarouselItems } from '../modules/carouselItems';
import { getMovies } from '../modules/movies';

const ONE_PAGE_ITEM_NUM = 15;

const MovieListContainer = ({ history, listType }) => {
  const [pageOffset, setPageOffset] = useState(1);
  const [sortType, setSortType] = useState('');

  const {
    loading: carouselItemsLoading,
    data: carouselItems,
    error: carouselItemsError,
  } = useSelector((state) => state.carouselItems);

  const {
    loading: moviesLoading,
    data: movies,
    error: moviesError,
  } = useSelector((state) => state.movies);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCarouselItems());
    dispatch(getMovies());
  }, [dispatch]);

  useEffect(() => {
    setSortType(listType === 'current' ? 'ticketing' : 'release');
  }, [listType]);

  const handleListTypeBtnClick = useCallback(
    (type) => {
      if (listType === type) return;
      history.push(`/movies/${type}`);
      setPageOffset(1);
    },
    [history, listType]
  );

  const handleSortTypeBtnClick = useCallback(
    (type) => {
      if (type === sortType) return;
      setSortType(type);
      setPageOffset(1);
    },
    [sortType]
  );

  const handleMoreClick = useCallback(() => {
    setPageOffset(pageOffset + 1);
  }, [pageOffset]);

  const filteredCarouselItems = useMemo(
    () =>
      carouselItems
        ? carouselItems.filter((item) => item.use === 'movie')
        : null,
    [carouselItems]
  );

  const filteredMovies = useMemo(
    () =>
      listType === 'current'
        ? movies &&
          movies
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
            })
        : movies &&
          movies
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
            }),
    [listType, movies, sortType]
  );

  const paginationMovies = useMemo(
    () =>
      filteredMovies
        ? filteredMovies.slice(0, ONE_PAGE_ITEM_NUM * pageOffset)
        : null,
    [filteredMovies, pageOffset]
  );

  const visibleMoreButton = useMemo(
    () =>
      filteredMovies
        ? pageOffset * ONE_PAGE_ITEM_NUM < filteredMovies.length
        : false,
    [filteredMovies, pageOffset]
  );

  if (carouselItemsLoading || moviesLoading) return <div>loading...</div>;
  if (carouselItemsError || moviesError) return <div>error!</div>;
  if (!carouselItems || !movies) return null;

  return (
    <>
      <MovieList
        carouselItems={filteredCarouselItems}
        movies={paginationMovies}
        listType={listType}
        sortType={sortType}
        handleListTypeBtnClick={handleListTypeBtnClick}
        handleSortTypeBtnClick={handleSortTypeBtnClick}
        visibleMoreButton={visibleMoreButton}
        handleMoreClick={handleMoreClick}
      />
    </>
  );
};

export default MovieListContainer;
