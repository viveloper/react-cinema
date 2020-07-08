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
  seatsState,
  onStepClick,
  onDivisionTabClick,
  onDivisionClick,
  onCinemaClick,
  onMovieListSortTypeClick,
  onMovieListViewTypeClick,
  onMovieClick,
  onDateClick,
  onFilteringTabClick,
  onTimeClick,
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
              onTimeClick={onTimeClick}
            />
          )}
        />

        <Route
          path="/ticketing/PersonSeat"
          render={() => {
            const { loading, data, error } = seatsState;

            if (loading) return <div>loading...</div>;
            if (error) return <div>error!</div>;
            if (!data) return null;

            return <Step02 seats={data.Seats.Items} />;
          }}
        />
      </TicketingBlock>
    </>
  );
};

export default React.memo(Ticketing);
