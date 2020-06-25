import React, { useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Home from '../components/Home';
import { getCarouselItems } from '../modules/carouselItems';
import { getMovies } from '../modules/movies';

const HomeContainer = () => {
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
    () => carouselItems && carouselItems.filter((item) => item.use === 'home'),
    [carouselItems]
  );

  if (carouselItemsLoading || moviesLoading) return <div>loading...</div>;
  if (carouselItemsError || moviesError) return <div>error!</div>;
  if (!carouselItems || !movies) return null;

  return <Home movies={movies} carouselItems={filteredCarouselItems} />;
};

export default HomeContainer;
