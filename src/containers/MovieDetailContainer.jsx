import React, { useEffect, useState, useMemo, useCallback } from 'react';
import MovieDetail from '../components/MovieDetail';
import { useSelector, useDispatch } from 'react-redux';
import { getMovieDetail, getMovieReview } from '../modules/movie';

const ONE_PAGE_REVIEW_NUM = 10;

const MovieDetailContainer = ({ movieCode }) => {
  const [activeTab, setActiveTab] = useState('info');
  const [reviewSortType, setReviewSortType] = useState('recent');
  const [reviewPageOffset, setReviewPageOffset] = useState(1);

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
    dispatch(
      getMovieReview({
        movieCode,
        page: 1,
        count: 10,
      })
    );
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

  const sortedReviewList = useMemo(() => {
    if (!movieReview) return null;

    return reviewSortType === 'recent'
      ? [...movieReview.TotalReviewItems.Items].sort((a, b) => {
          const dateA = a.RegistDate.toUpperCase(); // ignore upper and lowercase
          var dateB = b.RegistDate.toUpperCase(); // ignore upper and lowercase
          if (dateA < dateB) {
            return 1;
          }
          if (dateA > dateB) {
            return -1;
          }
          return 0;
        })
      : [...movieReview.TotalReviewItems.Items].sort(
          (a, b) => b.RecommandCount - a.RecommandCount
        );
  }, [movieReview, reviewSortType]);

  const handleTabClick = useCallback((tabName) => {
    setActiveTab(tabName);
  }, []);

  const handleReviewSortClick = useCallback((sortType) => {
    setReviewSortType(sortType);
    setReviewPageOffset(1);
  }, []);

  const handleReivewMoreClick = useCallback(() => {
    dispatch(
      getMovieReview({
        movieCode,
        page: 1,
        count: (reviewPageOffset + 1) * ONE_PAGE_REVIEW_NUM,
      })
    );
    setReviewPageOffset(reviewPageOffset + 1);
  }, [dispatch, movieCode, reviewPageOffset]);

  if (movieDetailLoading || movieReviewLoading) return <div>loading...</div>;
  if (movieDetailError || movieReviewError) return <div>error!</div>;
  if (!movieDetail || !movieDetail) return null;

  return (
    <MovieDetail
      carouselItems={carouselItems}
      movieDetail={movieDetail}
      movieScore={movieReview.ReviewCounts.MarkAvg}
      movieReview={sortedReviewList}
      totalReviewCount={movieReview.ReviewCounts.TotalReviewCount}
      reviewSortType={reviewSortType}
      handleReivewMoreClick={handleReivewMoreClick}
      handleReviewSortClick={handleReviewSortClick}
      activeTab={activeTab}
      handleTabClick={handleTabClick}
    />
  );
};

export default MovieDetailContainer;
