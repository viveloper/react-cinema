import React, { useEffect, useState, useMemo, useCallback } from 'react';
import MovieDetail from '../components/MovieDetail';
import { useSelector, useDispatch } from 'react-redux';
import { getMovieDetail, getMovieReview } from '../modules/movie';

const MovieDetailContainer = ({ movieCode }) => {
  const [activeTab, setActiveTab] = useState('info');

  const {
    loading: movieDetailLoading,
    data: movieDetail,
    error: movieDetailError,
  } = useSelector((state) => state.movie.movieDetail);

  const {
    loading: movieReviewLoading,
    data: movieReview,
    error: movieReviewError,
  } = useSelector((state) => state.movie.movieReview);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMovieDetail(movieCode));
    dispatch(getMovieReview(movieCode));
  }, [dispatch, movieCode]);

  const carouselItems = useMemo(
    () =>
      movieDetail
        ? movieDetail.Trailer.Items.filter(
            (trailer) => trailer.ImageDivisionCode === '1'
          ).map((trailer) => ({
            img: trailer.ImageURL,
          }))
        : null,
    [movieDetail]
  );

  const handleTabClick = useCallback((tabName) => {
    setActiveTab(tabName);
  }, []);

  if (movieDetailLoading || movieReviewLoading) return <div>loading...</div>;
  if (movieDetailError || movieReviewError) return <div>error!</div>;
  if (!movieDetail || !movieReview) return null;

  return (
    <MovieDetail
      carouselItems={carouselItems}
      movieDetail={movieDetail}
      movieReview={movieReview}
      activeTab={activeTab}
      handleTabClick={handleTabClick}
    />
  );
};

export default MovieDetailContainer;
