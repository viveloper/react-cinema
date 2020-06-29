import React, { useEffect, useState, useCallback, useMemo } from 'react';
import Ticketing from '../components/Ticketing';

import { useSelector, useDispatch } from 'react-redux';
import { getTicketingInfo } from '../modules/ticketing';
import { getPlaySeqs } from '../modules/playSeqs';

const TicketingContainer = () => {
  const { loading, data: ticketingInfo, error } = useSelector(
    (state) => state.ticketing
  );
  const { playSeqsLoading, data: playSeqs, playSeqsError } = useSelector(
    (state) => state.playSeqs
  );

  const [step, setStep] = useState(1);
  const [tab, setTab] = useState('all');
  const [detailDivisionCode, setDetailDivisionCode] = useState('0001');
  const [cinemaId, setCinemaId] = useState('');
  const [movieListSortType, setMovieSortType] = useState('A');
  const [movieListViewType, setMovieListViewType] = useState('text');
  const [selectedMovie, setSelectedMovie] = useState('');
  const [selectedDate, setSelectedDate] = useState('2020-04-19');

  const dispatch = useDispatch();

  useEffect(() => {
    if (ticketingInfo) return;
    dispatch(getTicketingInfo());
  }, [dispatch, ticketingInfo]);

  const {
    areaDivisions,
    specialTypeDivisions,
    cinemas,
    movies,
    playDates,
  } = !ticketingInfo ? {} : ticketingInfo;

  const divisions = useMemo(
    () =>
      areaDivisions && specialTypeDivisions
        ? [...areaDivisions, ...specialTypeDivisions]
        : null,
    [areaDivisions, specialTypeDivisions]
  );

  const filteredCimemas = useMemo(
    () =>
      cinemas
        ? cinemas.filter(
            (cinema) => cinema.DetailDivisionCode === detailDivisionCode
          )
        : null,
    [cinemas, detailDivisionCode]
  );

  const handleStepClick = useCallback((step) => {
    setStep(step);
  }, []);

  const handleTabClick = useCallback(
    (tab) => {
      setTab(tab);
      setDetailDivisionCode(
        tab === 'all'
          ? areaDivisions[0].DetailDivisionCode
          : specialTypeDivisions[0].DetailDivisionCode
      );
    },
    [areaDivisions, specialTypeDivisions]
  );

  const handleDivisionClick = useCallback((code) => {
    setDetailDivisionCode(code);
  }, []);

  const handleCinemaClick = useCallback(
    (id) => {
      setCinemaId(id);
      dispatch(
        getPlaySeqs({
          playDate: selectedDate,
          cinemaId: id,
          movieCode: selectedMovie,
        })
      );
    },
    [dispatch, selectedDate, selectedMovie]
  );

  const handleMovieListSortTypeClick = useCallback((type) => {
    setMovieSortType(type);
  }, []);

  const handleMovieListViewTypeClick = useCallback((type) => {
    setMovieListViewType(type);
  }, []);

  const handleMovieClick = useCallback(
    (code) => {
      const movieCode = code !== selectedMovie ? code : '';
      setSelectedMovie(movieCode);
      dispatch(
        getPlaySeqs({
          playDate: selectedDate,
          cinemaId: cinemaId,
          movieCode,
        })
      );
    },
    [dispatch, selectedDate, cinemaId, selectedMovie]
  );

  const handleDateClick = useCallback(
    (date) => {
      setSelectedDate(date);
      dispatch(
        getPlaySeqs({
          playDate: date,
          cinemaId: cinemaId,
          movieCode: selectedMovie,
        })
      );
    },
    [dispatch, cinemaId, selectedMovie]
  );

  if (loading) return <div>loading...</div>;
  if (error) return <div>error!</div>;
  if (!ticketingInfo) return null;

  return (
    <Ticketing
      divisions={divisions}
      cinemas={filteredCimemas}
      movies={movies}
      playDates={playDates}
      playSeqs={playSeqs}
      step={step}
      tab={tab}
      detailDivisionCode={detailDivisionCode}
      cinemaId={cinemaId}
      movieListSortType={movieListSortType}
      movieListViewType={movieListViewType}
      selectedMovie={selectedMovie}
      selectedDate={selectedDate}
      handleDivisionClick={handleDivisionClick}
      handleCinemaClick={handleCinemaClick}
      handleMovieListSortTypeClick={handleMovieListSortTypeClick}
      handleMovieListViewTypeClick={handleMovieListViewTypeClick}
      handleMovieClick={handleMovieClick}
      handleStepClick={handleStepClick}
      handleTabClick={handleTabClick}
      handleDateClick={handleDateClick}
    />
  );
};

export default TicketingContainer;
