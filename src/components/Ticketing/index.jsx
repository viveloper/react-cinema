import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import TicketingBlock from './TicketingBlock';
import AsideStepMenu from './AsideStepMenu';
import Step01 from './Step01';
import Step02 from './Step02';
import Step03 from './Step03';
import Step04 from './Step04';

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
  selectedMovieCode,
  selectedDate,
  filteringTab,
  playMovieInfo,
  seatsState,
  userTicketingInfo,
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
  goPayment,
  goPaymentComplete,
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
              selectedMovieCode={selectedMovieCode}
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
            if (!data) return <Redirect to="/ticketing" />;

            return (
              <Step02
                screenSeatInfo={data.ScreenSeatInfo.Items[0]}
                seats={data.Seats.Items}
                customerDivision={data.CustomerDivision.Items}
                fees={data.Fees.Items}
                playMovieInfo={playMovieInfo}
                goPayment={goPayment}
              />
            );
          }}
        />

        <Route
          path="/ticketing/payment"
          render={() => {
            if (!userTicketingInfo)
              return <Redirect to="/ticketing/PersonSeat" />;
            return (
              <Step03
                userTicketingInfo={userTicketingInfo}
                goPaymentComplete={goPaymentComplete}
              />
            );
          }}
        />

        <Route
          path="/ticketing/PaymentComplete"
          render={() => {
            if (!userTicketingInfo)
              return <Redirect to="/ticketing/PersonSeat" />;
            return <Step04 userTicketingInfo={userTicketingInfo} />;
          }}
        />
      </TicketingBlock>
    </>
  );
};

export default React.memo(Ticketing);
