import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import Layout from '../components/Layout';
import Carousel from '../components/Carousel';
import SectionMovieList from '../components/MovieList/SectionMovieList';
import Menu from '../components/MovieList/Menu';
import ListTypeButton from '../components/MovieList/ListTypeButton';
import SortTypeButtons from '../components/MovieList/SortTypeButtons';
import SortTypeButton from '../components/MovieList/SortTypeButton';
import List from '../components/MovieList/List';
import MoreButton from '../components/MoreButton';

import movieData from '../data/movies.json';
import carouselItems from '../data/carouselItems02';

const _movies = movieData.Movies.Items[0].Items;
const ONE_PAGE_ITEM_NUM = 15;

const MovieList = ({ location, history }) => {
  const query = queryString.parse(location.search);

  const [sortType, setSortType] = useState('');
  const [movies, setMovies] = useState([]);
  const [pageOffset, setPageOffset] = useState(1);
  const [visibleMoreButton, setVisibleMoreButton] = useState(false);

  useEffect(() => {
    const getInitSortType = () => {
      return query.type === 'current' ? 'ticketing' : 'release';
    };
    setSortType(getInitSortType);
  }, [query.type]);

  useEffect(() => {
    const getMovies = () => {
      if (query.type === 'current') {
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
  }, [query.type, sortType, pageOffset]);

  const handleListTypeBtnClick = (type) => {
    if (query.type === type) return;
    history.push(`/movie/list?type=${type}`);
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
      <Carousel height={420} items={carouselItems} />

      <SectionMovieList>
        <Menu>
          <ListTypeButton
            type="current"
            name="현재 상영작"
            active={query.type === 'current' ? true : false}
            onClick={handleListTypeBtnClick}
          />
          <ListTypeButton
            type="pre"
            name="상영 예정작"
            active={query.type === 'pre' ? true : false}
            onClick={handleListTypeBtnClick}
          />
          <SortTypeButtons>
            {query.type === 'current' ? (
              <>
                <SortTypeButton
                  type="ticketing"
                  name="예매순"
                  active={sortType === 'ticketing' ? true : false}
                  onClick={handleSortTypeBtnClick}
                />
                <SortTypeButton
                  type="grade"
                  name="평점순"
                  active={sortType === 'grade' ? true : false}
                  onClick={handleSortTypeBtnClick}
                />
                <SortTypeButton
                  type="review"
                  name="관람평 많은순"
                  active={sortType === 'review' ? true : false}
                  onClick={handleSortTypeBtnClick}
                />
                <SortTypeButton
                  type="wish"
                  name="보고싶어요순"
                  active={sortType === 'wish' ? true : false}
                  onClick={handleSortTypeBtnClick}
                />
              </>
            ) : (
              <>
                <SortTypeButton
                  type="release"
                  name="개봉일순"
                  active={sortType === 'release' ? true : false}
                  onClick={handleSortTypeBtnClick}
                />
                <SortTypeButton
                  type="ticketing"
                  name="예매순"
                  active={sortType === 'ticketing' ? true : false}
                  onClick={handleSortTypeBtnClick}
                />
                <SortTypeButton
                  type="wish"
                  name="보고싶어요순"
                  active={sortType === 'wish' ? true : false}
                  onClick={handleSortTypeBtnClick}
                />
              </>
            )}
          </SortTypeButtons>
        </Menu>

        <List movies={movies} />

        {visibleMoreButton ? <MoreButton onClick={handleMoreClick} /> : null}
      </SectionMovieList>
    </Layout>
  );
};

export default MovieList;
