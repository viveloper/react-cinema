import React, { useState } from 'react';
import Layout from '../components/Layout';
import TicketingContainer from '../components/Ticketing/TicketingContainer';
import AsideStepMenu from '../components/Ticketing/AsideStepMenu';
import Step01 from '../components/Ticketing/Step01';
import SectionCinema from '../components/Ticketing/SectionCinema';
import SectionTitle from '../components/Ticketing/SectionTitle';
import DivisionTabs from '../components/Ticketing/DivisionTabs';
import Divisions from '../components/Ticketing/Divisions';
import DivisionList from '../components/Ticketing/DivisionList';
import CinemaList from '../components/Ticketing/CinemaList';
import SectionMovie from '../components/Ticketing/SectionMovie';
import TypeMenu from '../components/Ticketing/TypeMenu';
import MovieList from '../components/Ticketing/MovieList';
import SectionTime from '../components/Ticketing/SectionTime';

import ticketingInfo from '../data/ticketingInfo.json';

const Ticketing = () => {
  const [step, setStep] = useState(1);
  const [tab, setTab] = useState('all');
  const [detailDivisionCode, setDetailDivisionCode] = useState('0001');
  const [cinemaId, setCinemaId] = useState('');
  const [movieListSortType, setMovieSortType] = useState('A');
  const [movieListViewType, setMovieListViewType] = useState('text');
  const [selectedMovie, setSelectedMovie] = useState('');

  const areaDivisions = ticketingInfo.CinemaDivison.AreaDivisions.Items;
  const specialTypeDivisions =
    ticketingInfo.CinemaDivison.SpecialTypeDivisions.Items;
  const divisions = [...areaDivisions, ...specialTypeDivisions];
  const cinemas = ticketingInfo.Cinemas.Cinemas.Items.filter(
    (cinema) => cinema.DetailDivisionCode === detailDivisionCode
  );
  const movies = ticketingInfo.Movies.Movies.Items.filter(
    (movie) => movie.BookingYN === 'Y'
  );

  const handleStepClick = (step) => {
    setStep(step);
  };
  const handleTabClick = (tab) => {
    setTab(tab);
    setDetailDivisionCode(
      tab === 'all'
        ? areaDivisions[0].DetailDivisionCode
        : specialTypeDivisions[0].DetailDivisionCode
    );
  };
  const handleDivisionClick = (code) => {
    setDetailDivisionCode(code);
  };
  const handleCinemaClick = (code) => {
    setCinemaId(code);
  };
  const handleMovieListSortTypeClick = (type) => {
    setMovieSortType(type);
  };
  const handleMovieListViewTypeClick = (type) => {
    setMovieListViewType(type);
  };
  const handleMovieClick = (code) => {
    setSelectedMovie(code);
  };

  return (
    <Layout theme="light">
      <TicketingContainer>
        <AsideStepMenu step={step} onClick={handleStepClick} />
        <Step01>
          <SectionCinema>
            <SectionTitle title="영화관" />
            <DivisionTabs tab={tab} onClick={handleTabClick} />
            <Divisions>
              <DivisionList
                divisions={divisions}
                tab={tab}
                detailDivisionCode={detailDivisionCode}
                onDivisionClick={handleDivisionClick}
              />
              <CinemaList
                cinemas={cinemas}
                cinemaId={cinemaId}
                onCinemaClick={handleCinemaClick}
              />
            </Divisions>
          </SectionCinema>
          <SectionMovie>
            <SectionTitle title="영화 선택" />
            <TypeMenu
              sortType={movieListSortType}
              viewType={movieListViewType}
              onSortTypeClick={handleMovieListSortTypeClick}
              onViewTypeClick={handleMovieListViewTypeClick}
            />
            <MovieList
              movies={movies}
              sortType={movieListSortType}
              viewType={movieListViewType}
              selectedMovie={selectedMovie}
              onMovieClick={handleMovieClick}
            />
          </SectionMovie>
          <SectionTime>
            <SectionTitle title="2020-04-22(오늘)" />
            <Calendar />
            <FilteringTabs />
            <ResultView />
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
      </TicketingContainer>
    </Layout>
  );
};

export default Ticketing;
