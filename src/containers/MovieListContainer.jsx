import React from 'react';

import Carousel from '../components/Carousel';
import SectionMovieList from '../components/MovieList/SectionMovieList';
import Menu from '../components/MovieList/Menu';
import ListTypeButton from '../components/MovieList/ListTypeButton';
import SortTypeButtons from '../components/MovieList/SortTypeButtons';
import SortTypeButton from '../components/MovieList/SortTypeButton';
import List from '../components/MovieList/List';
import MoreButton from '../components/MoreButton';

const MovieListContainer = ({
  carouselItems,
  listType,
  sortType,
  handleListTypeBtnClick,
  handleSortTypeBtnClick,
  movies,
  visibleMoreButton,
  handleMoreClick,
}) => {
  return (
    <>
      <Carousel height={420} items={carouselItems} />

      <SectionMovieList>
        <Menu>
          <ListTypeButton
            type="current"
            name="현재 상영작"
            active={listType === 'current' ? true : false}
            onClick={handleListTypeBtnClick}
          />
          <ListTypeButton
            type="pre"
            name="상영 예정작"
            active={listType === 'pre' ? true : false}
            onClick={handleListTypeBtnClick}
          />
          <SortTypeButtons>
            {listType === 'current' ? (
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
    </>
  );
};

export default MovieListContainer;
