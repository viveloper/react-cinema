import React, { useEffect, useState, useMemo, useCallback } from 'react';
import MovieDetail from '../components/MovieDetail';
import { useSelector, useDispatch } from 'react-redux';
import { getMovieDetail, getMovieReview } from '../modules/movie';

const ONE_PAGE_REVIEW_NUM = 10;

const MovieDetailContainer = ({ movieCode }) => {
  const [activeTab, setActiveTab] = useState('info');
  const [reviewPageOffset, setReviewPageOffset] = useState(1);
  const [sortType, setSortType] = useState('recent');

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
  }, [dispatch, movieCode]);

  useEffect(() => {
    dispatch(
      getMovieReview({
        movieCode,
        page: 1,
        count: 10,
        sortType,
      })
    );
  }, [dispatch, movieCode, sortType]);

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

  const totalReviewCount = useMemo(
    () => (movieReview ? movieReview.ReviewCounts.TotalReviewCount : 0),
    [movieReview]
  );
  const reviewScore = useMemo(
    () => (movieReview ? movieReview.ReviewCounts.MarkAvg : 0),
    [movieReview]
  );
  const reviewList = useMemo(
    () => (movieReview ? movieReview.TotalReviewItems.Items : null),
    [movieReview]
  );

  const handleTabClick = useCallback((tabName) => {
    setActiveTab(tabName);
  }, []);

  const handleReviewSortClick = useCallback((type) => {
    setSortType(type);
    setReviewPageOffset(1);
  }, []);

  const handleReivewMoreClick = useCallback(() => {
    dispatch(
      getMovieReview({
        movieCode,
        page: 1,
        count: (reviewPageOffset + 1) * ONE_PAGE_REVIEW_NUM,
        sortType,
      })
    );
    setReviewPageOffset(reviewPageOffset + 1);
  }, [dispatch, movieCode, reviewPageOffset, sortType]);

  const handleReviewSubmit = useCallback(
    ({ reviewText, evaluation }) => {
      console.log({ movieCode, reviewText, evaluation });
    },
    [movieCode]
  );

  if (movieDetailLoading || (movieReviewLoading && !movieReview))
    return <div>loading...</div>;
  if (movieDetailError || movieReviewError) return <div>error!</div>;
  if (!movieDetail || !movieReview) return null;

  return (
    <MovieDetail
      carouselItems={carouselItems}
      movieDetail={movieDetail}
      activeTab={activeTab}
      reviewList={reviewList}
      totalReviewCount={totalReviewCount}
      reviewScore={reviewScore}
      reviewSortType={sortType}
      onTabClick={handleTabClick}
      onReviewSortClick={handleReviewSortClick}
      onReviewMoreClick={handleReivewMoreClick}
      onReviewSubmit={handleReviewSubmit}
    />
  );
};

export default MovieDetailContainer;
