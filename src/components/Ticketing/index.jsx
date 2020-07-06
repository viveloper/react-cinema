import React from 'react';
import { Route } from 'react-router-dom';

import TicketingBlock from './TicketingBlock';
import AsideStepMenu from './AsideStepMenu';
import Step01 from './Step01';
import Step02 from './Step02';

const Ticketing = ({
  divisions,
  cinemas,
  movies,
  playDates,
  playMovieListState,
  step,
  divisionTab,
  detailDivisionCode,
  cinemaId,
  movieListSortType,
  movieListViewType,
  selectedMovie,
  selectedDate,
  filteringTab,
  onStepClick,
  onDivisionTabClick,
  onDivisionClick,
  onCinemaClick,
  onMovieListSortTypeClick,
  onMovieListViewTypeClick,
  onMovieClick,
  onDateClick,
  onFilteringTabClick,
}) => {
  return (
    <>
      <TicketingBlock>
        <AsideStepMenu step={step} onClick={onStepClick} />
        <Route
          path="/ticketing"
          exact
          render={() => (
            <Step01
              divisionTab={divisionTab}
              divisions={divisions}
              detailDivisionCode={detailDivisionCode}
              cinemas={cinemas}
              cinemaId={cinemaId}
              movieListSortType={movieListSortType}
              movieListViewType={movieListViewType}
              movies={movies}
              selectedMovie={selectedMovie}
              selectedDate={selectedDate}
              playDates={playDates}
              filteringTab={filteringTab}
              playMovieListState={playMovieListState}
              onDivisionTabClick={onDivisionTabClick}
              onDivisionClick={onDivisionClick}
              onCinemaClick={onCinemaClick}
              onMovieListSortTypeClick={onMovieListSortTypeClick}
              onMovieListViewTypeClick={onMovieListViewTypeClick}
              onMovieClick={onMovieClick}
              onDateClick={onDateClick}
              onFilteringTabClick={onFilteringTabClick}
            />
          )}
        />

        <Route path="/ticketing/PersonSeat" render={() => <Step02 />} />
      </TicketingBlock>
    </>
  );
};

export default React.memo(Ticketing);
