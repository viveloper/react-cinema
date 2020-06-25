import React, { useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Movies from '../components/Movies';
import { getCarouselItems } from '../modules/carouselItems';
import { getMovies } from '../modules/movies';

const MoviesContainer = () => {
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

  const filteredCarouselItems = useMemo(
    () => carouselItems && carouselItems.filter((item) => item.use === 'movie'),
    [carouselItems]
  );

  const top5CurrentMovies = useMemo(
    () =>
      movies &&
      movies.filter((movie) => parseInt(movie.DDay) === 0).slice(0, 5),
    [movies]
  );

  const top5PreMovies = useMemo(
    () =>
      movies && movies.filter((movie) => parseInt(movie.DDay) > 0).slice(0, 5),
    [movies]
  );

  const arteMovies = useMemo(() => movies && movies.slice(1, 4), [movies]);
  const operaMovies = useMemo(() => movies && movies.slice(5, 6), [movies]);

  if (carouselItemsLoading || moviesLoading) return <div>loading...</div>;
  if (carouselItemsError || moviesError) return <div>error!</div>;
  if (!carouselItems || !movies) return null;

  return (
    <Movies
      carouselItems={filteredCarouselItems}
      top5CurrentMovies={top5CurrentMovies}
      top5PreMovies={top5PreMovies}
      arteMovies={arteMovies}
      operaMovies={operaMovies}
    />
  );
};

export default MoviesContainer;
