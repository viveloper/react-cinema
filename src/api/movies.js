import movies from './data/movies.json';

export const getMovies = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(movies);
    }, 300);
  });
};
