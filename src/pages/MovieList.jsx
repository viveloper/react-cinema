import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import Layout from '../components/Layout';
import Carousel from '../components/Carousel';
import MovieCard from '../components/MovieCard';
import classes from './MovieList.module.css';

import movieData from '../data/movies.json';
import carouselItems from '../data/carouselItems02';

const _movies = movieData.Movies.Items[0].Items;
const ONE_PAGE_ITEM_NUM = 15;

const MovieList = ({ location }) => {
  const query = queryString.parse(location.search);

  const [type, setType] = useState(query.type);
  const [sortType, setSortType] = useState('ticketing');
  const [movies, setMovies] = useState([]);
  const [pageOffset, setPageOffset] = useState(1);

  useEffect(() => {
    if (type === 'current') {
      setSortType('ticketing');
    } else if (type === 'pre') {
      setSortType('release');
    }
  }, []);

  useEffect(() => {
    if (type === 'current') {
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
          }
        })
        .slice(0, ONE_PAGE_ITEM_NUM * pageOffset);
      setMovies(currentMovies);
    } else if (type === 'pre') {
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
            return Date.UTC(b.ReleaseDate) - Date.UTC(a.ReleaseDate);
          }
        })
        .slice(0, ONE_PAGE_ITEM_NUM * pageOffset);
      setMovies(preMovies);
    }
  }, [type, pageOffset, sortType]);

  const handleTypeBtnClick = (type) => {
    setType(type);
    setPageOffset(1);
    if (type === 'current') {
      setSortType('ticketing');
    } else if (type === 'pre') {
      setSortType('release');
    }
  };
  const handleSortTypeClick = (e, sortType) => {
    e.preventDefault();
    setSortType(sortType);
    setPageOffset(1);
  };
  const handleMoreClick = () => {
    setPageOffset(pageOffset + 1);
  };

  return (
    <Layout theme="light">
      <section>
        <Carousel height={420} items={carouselItems} />
      </section>

      <section className={classes['section-movie-list']}>
        <div className="center">
          <div className={classes['header']}>
            <button
              className={`${classes['btn-type']} ${
                type === 'current' ? classes['active'] : ''
              }`}
              onClick={() => handleTypeBtnClick('current')}
            >
              현재 상영작
            </button>
            <button
              className={`${classes['btn-type']} ${
                type === 'pre' ? classes['active'] : ''
              }`}
              onClick={() => handleTypeBtnClick('pre')}
            >
              상영 예정작
            </button>
            <ul className={classes['sort-type-links']}>
              {type === 'pre' ? (
                <li className={classes['sort-type-link']}>
                  <a
                    href="#"
                    className={sortType === 'release' ? classes['active'] : ''}
                    onClick={(e) => handleSortTypeClick(e, 'release')}
                  >
                    개봉일순
                  </a>
                </li>
              ) : null}
              <li className={classes['sort-type-link']}>
                <a
                  href="#"
                  className={sortType === 'ticketing' ? classes['active'] : ''}
                  onClick={(e) => handleSortTypeClick(e, 'ticketing')}
                >
                  예매순
                </a>
              </li>
              {type === 'current' ? (
                <>
                  <li className={classes['sort-type-link']}>
                    <a
                      href="#"
                      className={sortType === 'grade' ? classes['active'] : ''}
                      onClick={(e) => handleSortTypeClick(e, 'grade')}
                    >
                      평점순
                    </a>
                  </li>
                  <li className={classes['sort-type-link']}>
                    <a
                      href="#"
                      className={sortType === 'review' ? classes['active'] : ''}
                      onClick={(e) => handleSortTypeClick(e, 'review')}
                    >
                      관람평 많은순
                    </a>
                  </li>
                </>
              ) : null}
              <li className={classes['sort-type-link']}>
                <a
                  href="#"
                  className={sortType === 'wish' ? classes['active'] : ''}
                  onClick={(e) => handleSortTypeClick(e, 'wish')}
                >
                  보고싶어요순
                </a>
              </li>
            </ul>
          </div>
          <ul className={classes['list']}>
            {movies.map((movie, index) => (
              <li key={movie.RepresentationMovieCode} className={classes.item}>
                <MovieCard movie={movie} number={index + 1} theme="light" />
              </li>
            ))}
          </ul>
          <button className={classes['btn-more']} onClick={handleMoreClick}>
            펼쳐보기 <i className="fas fa-angle-down"></i>
          </button>
        </div>
      </section>
    </Layout>
  );
};

export default MovieList;
