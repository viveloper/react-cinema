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
import MoreButton from '../components/MovieList/MoreButton';

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

  const handleListTypeBtnClick = (type) => {
    setType(type);
    setPageOffset(1);
    if (type === 'current') {
      setSortType('ticketing');
    } else if (type === 'pre') {
      setSortType('release');
    }
  };
  const handleSortTypeBtnClick = (sortType) => {
    setSortType(sortType);
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
            active={type === 'current' ? true : false}
            onClick={handleListTypeBtnClick}
          />
          <ListTypeButton
            type="pre"
            name="상영 예정작"
            active={type === 'pre' ? true : false}
            onClick={handleListTypeBtnClick}
          />
          <SortTypeButtons>
            {type === 'current' ? (
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

        <MoreButton onClick={handleMoreClick} />
      </SectionMovieList>
    </Layout>
  );
};

export default MovieList;
