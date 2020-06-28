import React, { useEffect, useState, useCallback, useMemo } from 'react';
import Ticketing from '../components/Ticketing';

import { useSelector, useDispatch } from 'react-redux';
import { getTicketingInfo } from '../modules/ticketing';

const TicketingContainer = () => {
  const { loading, data, error } = useSelector((state) => state.ticketing);

  const [step, setStep] = useState(1);
  const [tab, setTab] = useState('all');
  const [detailDivisionCode, setDetailDivisionCode] = useState('0001');
  const [cinemaId, setCinemaId] = useState('');
  const [movieListSortType, setMovieSortType] = useState('A');
  const [movieListViewType, setMovieListViewType] = useState('text');
  const [selectedMovie, setSelectedMovie] = useState('');

  const dispatch = useDispatch();

  useEffect(() => {
    if (data) return;
    dispatch(
      getTicketingInfo({
        playDate: '2020-06-29',
        cinemaId: 1004,
        movieCode: null,
      })
    );
  }, [dispatch, data]);

  const {
    areaDivisions,
    specialTypeDivisions,
    cinemas,
    movies,
    playDates,
    playSeqs,
  } = !data ? {} : data;

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

  const handleCinemaClick = useCallback((code) => {
    setCinemaId(code);
  }, []);

  const handleMovieListSortTypeClick = useCallback((type) => {
    setMovieSortType(type);
  }, []);

  const handleMovieListViewTypeClick = useCallback((type) => {
    setMovieListViewType(type);
  }, []);

  const handleMovieClick = useCallback((code) => {
    setSelectedMovie(code);
  }, []);

  if (loading) return <div>loading...</div>;
  if (error) return <div>error!</div>;
  if (!data) return null;

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
      handleDivisionClick={handleDivisionClick}
      handleCinemaClick={handleCinemaClick}
      handleMovieListSortTypeClick={handleMovieListSortTypeClick}
      handleMovieListViewTypeClick={handleMovieListViewTypeClick}
      handleMovieClick={handleMovieClick}
      handleStepClick={handleStepClick}
      handleTabClick={handleTabClick}
    />
  );
};

export default TicketingContainer;
