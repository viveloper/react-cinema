import React from 'react';

import TicketingBlock from './TicketingBlock';
import AsideStepMenu from './AsideStepMenu';
import Step01 from './Step01';
import SectionCinema from './SectionCinema';
import SectionTitle from './SectionTitle';
import DivisionTabs from './DivisionTabs';
import Divisions from './Divisions';
import DivisionList from './DivisionList';
import CinemaList from './CinemaList';
import SectionMovie from './SectionMovie';
import TypeMenu from './TypeMenu';
import MovieList from './MovieList';
import SectionTime from './SectionTime';
import Calendar from './Calendar';
import FilteringTabs from './FilteringTabs';
import ResultView from './ResultView';

const Ticketing = ({
  divisions,
  cinemas,
  movies,
  playDates,
  playMovieList,
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
        <Step01>
          <SectionCinema>
            <SectionTitle title="영화관" />
            <DivisionTabs tab={divisionTab} onClick={onDivisionTabClick} />
            <Divisions>
              <DivisionList
                divisions={divisions}
                tab={divisionTab}
                detailDivisionCode={detailDivisionCode}
                onDivisionClick={onDivisionClick}
              />
              <CinemaList
                cinemas={cinemas}
                cinemaId={cinemaId}
                onCinemaClick={onCinemaClick}
              />
            </Divisions>
          </SectionCinema>
          <SectionMovie>
            <SectionTitle title="영화 선택" />
            <TypeMenu
              sortType={movieListSortType}
              viewType={movieListViewType}
              onSortTypeClick={onMovieListSortTypeClick}
              onViewTypeClick={onMovieListViewTypeClick}
            />
            <MovieList
              movies={movies}
              sortType={movieListSortType}
              viewType={movieListViewType}
              selectedMovie={selectedMovie}
              onMovieClick={onMovieClick}
            />
          </SectionMovie>
          <SectionTime>
            <SectionTitle title={selectedDate} />
            <Calendar playDates={playDates} onDateClick={onDateClick} />
            <FilteringTabs tab={filteringTab} onClick={onFilteringTabClick} />
            <ResultView playMovieList={playMovieList} />
          </SectionTime>
        </Step01>

        {/* <div
        className={`${classes['step-content']} ${classes['step2']}`}
      ></div>
      <div
        className={`${classes['step-content']} ${classes['step3']}`}
      ></div>
      <div
        className={`${classes['step-content']} ${classes['step4']}`}
      ></div> */}
      </TicketingBlock>
    </>
  );
};

export default React.memo(Ticketing);
