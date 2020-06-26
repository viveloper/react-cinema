import movieDetailList from './data/movieDetailList.json';
import movieReviewList from './data/movieReviewList.json';

export const getMovieDetail = (movieCode) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(
        movieDetailList.filter(
          (movieDetail) =>
            movieDetail.Movie.RepresentationMovieCode === movieCode
        )[0]
      );
    }, 300);
  });
};

export const getMovieReview = (movieCode) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(
        movieReviewList.filter(
          (movieReview) => movieReview.RepresentationMovieCode === movieCode
        )[0]
      );
    }, 300);
  });
};
