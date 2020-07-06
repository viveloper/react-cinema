import React, { useEffect, useState, useCallback, useMemo } from 'react';
import Ticketing from '../components/Ticketing';

import { useSelector, useDispatch } from 'react-redux';
import { getTicketingInfo } from '../modules/ticketing';
import { getPlaySeqs } from '../modules/playSeqs';

const getToday = () => {
  const date = new Date();

  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return `${year}-${month > 9 ? month : '0' + month}-${
    day > 9 ? day : '0' + day
  }`;
};

const getPlayMovieList = (playSeqs, filteringTabName) => {
  if (!playSeqs) return [];

  const playMovieList = [];
  playSeqs.forEach((playSeq) => {
    const movie = playMovieList.find(
      (movie) =>
        movie.RepresentationMovieCode === playSeq.RepresentationMovieCode
    );
    if (!movie) {
      const newMovie = {
        RepresentationMovieCode: playSeq.RepresentationMovieCode,
        MovieNameKR: playSeq.MovieNameKR,
        MovieNameUS: playSeq.MovieNameUS,
        ViewGradeCode: playSeq.ViewGradeCode,
        divisions: [
          {
            FilmCode: playSeq.FilmCode,
            FilmNameKR: playSeq.FilmNameKR,
            FilmNameUS: playSeq.FilmNameUS,
            TranslationDivisionCode: playSeq.TranslationDivisionCode,
            TranslationDivisionNameKR: playSeq.TranslationDivisionNameKR,
            TranslationDivisionNameUS: playSeq.TranslationDivisionNameUS,
            ScreenDivisionCode: playSeq.ScreenDivisionCode,
            ScreenDivisionNameKR: playSeq.ScreenDivisionNameKR,
            ScreenDivisionNameUS: playSeq.ScreenDivisionNameUS,
            ScreenDesc: playSeq.ScreenDesc,
            times: [
              {
                PlaySequence: playSeq.PlaySequence,
                PlayDt: playSeq.PlayDt,
                StartTime: playSeq.StartTime,
                EndTime: playSeq.EndTime,
                TotalSeatCount: playSeq.TotalSeatCount,
                BookingSeatCount: playSeq.BookingSeatCount,
                ScreenID: playSeq.ScreenID,
                ScreenNameKR: playSeq.ScreenNameKR,
                ScreenNameUS: playSeq.ScreenNameUS,
              },
            ],
          },
        ],
      };
      playMovieList.push(newMovie);
    } else {
      const division = movie.divisions.find(
        (division) =>
          division.FilmCode === playSeq.FilmCode &&
          division.ScreenDivisionCode === playSeq.ScreenDivisionCode &&
          division.TranslationDivisionCode === playSeq.TranslationDivisionCode
      );
      if (!division) {
        const newDivision = {
          FilmCode: playSeq.FilmCode,
          FilmNameKR: playSeq.FilmNameKR,
          FilmNameUS: playSeq.FilmNameUS,
          TranslationDivisionCode: playSeq.TranslationDivisionCode,
          TranslationDivisionNameKR: playSeq.TranslationDivisionNameKR,
          TranslationDivisionNameUS: playSeq.TranslationDivisionNameUS,
          ScreenDivisionCode: playSeq.ScreenDivisionCode,
          ScreenDivisionNameKR: playSeq.ScreenDivisionNameKR,
          ScreenDivisionNameUS: playSeq.ScreenDivisionNameUS,
          ScreenDesc: playSeq.ScreenDesc,
          times: [
            {
              PlaySequence: playSeq.PlaySequence,
              PlayDt: playSeq.PlayDt,
              StartTime: playSeq.StartTime,
              EndTime: playSeq.EndTime,
              TotalSeatCount: playSeq.TotalSeatCount,
              BookingSeatCount: playSeq.BookingSeatCount,
              ScreenID: playSeq.ScreenID,
              ScreenNameKR: playSeq.ScreenNameKR,
              ScreenNameUS: playSeq.ScreenNameUS,
            },
          ],
        };
        movie.divisions.push(newDivision);
      } else {
        const newTime = {
          PlaySequence: playSeq.PlaySequence,
          PlayDt: playSeq.PlayDt,
          StartTime: playSeq.StartTime,
          EndTime: playSeq.EndTime,
          TotalSeatCount: playSeq.TotalSeatCount,
          BookingSeatCount: playSeq.BookingSeatCount,
          ScreenID: playSeq.ScreenID,
          ScreenNameKR: playSeq.ScreenNameKR,
          ScreenNameUS: playSeq.ScreenNameUS,
        };
        division.times.push(newTime);
      }
    }
  });
  return filteringTabName === 'all'
    ? playMovieList
    : playMovieList
        .map((playMovie) => ({
          ...playMovie,
          divisions: playMovie.divisions.filter(
            (division) => division.ScreenDivisionCode !== 100
          ),
        }))
        .filter((playMovie) => playMovie.divisions.length !== 0);
};

const TicketingContainer = () => {
  const { loading, data: ticketingInfo, error } = useSelector(
    (state) => state.ticketing
  );

  const playSeqsState = useSelector((state) => state.playSeqs);

  const [step, setStep] = useState(1);
  const [divisionTab, setDivisionTab] = useState('all');
  const [detailDivisionCode, setDetailDivisionCode] = useState('0001');
  const [cinemaId, setCinemaId] = useState('');
  const [movieListSortType, setMovieSortType] = useState('A');
  const [movieListViewType, setMovieListViewType] = useState('text');
  const [selectedMovie, setSelectedMovie] = useState('');
  const [selectedDate, setSelectedDate] = useState(getToday());
  const [filteringTab, setFilteringTab] = useState('all');

  const dispatch = useDispatch();

  useEffect(() => {
    if (ticketingInfo) return;
    dispatch(getTicketingInfo());
  }, [dispatch, ticketingInfo]);

  const areaDivisions = ticketingInfo
    ? ticketingInfo.CinemaDivison.AreaDivisions.Items
    : null;
  const specialTypeDivisions = ticketingInfo
    ? ticketingInfo.CinemaDivison.SpecialTypeDivisions.Items
    : null;
  const cinemas = ticketingInfo ? ticketingInfo.Cinemas.Cinemas.Items : null;
  const movies = ticketingInfo ? ticketingInfo.Movies.Movies.Items : null;
  const playDates = ticketingInfo
    ? ticketingInfo.MoviePlayDates.Items.Items
    : null;

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

  const playSeqs = playSeqsState.data
    ? playSeqsState.data.PlaySeqs.Items
    : null;
  const playMovieList = useMemo(
    () => getPlayMovieList(playSeqs, filteringTab),
    [playSeqs, filteringTab]
  );
  const playMovieListState = {
    loading: playSeqsState.loading,
    data: playMovieList,
    error: playSeqsState.error,
  };

  const handleStepClick = useCallback((step) => {
    setStep(step);
  }, []);

  const handleDivisionTabClick = useCallback(
    (tab) => {
      setDivisionTab(tab);
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
      const divisionCode = divisionTab === 'all' ? 1 : 2;
      const cinemaIdSeq = `${divisionCode}|${detailDivisionCode}|${id}`;
      setCinemaId(id);
      dispatch(
        getPlaySeqs({
          playDate: selectedDate,
          cinemaId: cinemaIdSeq,
          movieCode: selectedMovie,
        })
      );
    },
    [dispatch, selectedDate, selectedMovie, divisionTab, detailDivisionCode]
  );

  const handleMovieListSortTypeClick = useCallback((type) => {
    setMovieSortType(type);
  }, []);

  const handleMovieListViewTypeClick = useCallback((type) => {
    setMovieListViewType(type);
  }, []);

  const handleMovieClick = useCallback(
    (code) => {
      if (!cinemaId) return;
      const divisionCode = divisionTab === 'all' ? 1 : 2;
      const cinemaIdSeq = `${divisionCode}|${detailDivisionCode}|${cinemaId}`;
      const movieCode = code !== selectedMovie ? code : '';
      setSelectedMovie(movieCode);
      dispatch(
        getPlaySeqs({
          playDate: selectedDate,
          cinemaId: cinemaIdSeq,
          movieCode,
        })
      );
    },
    [
      dispatch,
      selectedDate,
      cinemaId,
      selectedMovie,
      divisionTab,
      detailDivisionCode,
    ]
  );

  const handleDateClick = useCallback(
    (date) => {
      if (!cinemaId) return;
      const divisionCode = divisionTab === 'all' ? 1 : 2;
      const cinemaIdSeq = `${divisionCode}|${detailDivisionCode}|${cinemaId}`;
      setSelectedDate(date);
      dispatch(
        getPlaySeqs({
          playDate: date,
          cinemaId: cinemaIdSeq,
          movieCode: selectedMovie,
        })
      );
    },
    [dispatch, cinemaId, selectedMovie, divisionTab, detailDivisionCode]
  );

  const handleFilteringTabClick = useCallback((tabName) => {
    setFilteringTab(tabName);
  }, []);

  if (loading) return <div>loading...</div>;
  if (error) return <div>error!</div>;
  if (!ticketingInfo) return null;

  return (
    <Ticketing
      divisions={divisions}
      cinemas={filteredCimemas}
      movies={movies}
      playDates={playDates}
      playMovieListState={playMovieListState}
      step={step}
      divisionTab={divisionTab}
      detailDivisionCode={detailDivisionCode}
      cinemaId={cinemaId}
      movieListSortType={movieListSortType}
      movieListViewType={movieListViewType}
      selectedMovie={selectedMovie}
      selectedDate={selectedDate}
      filteringTab={filteringTab}
      onDivisionClick={handleDivisionClick}
      onCinemaClick={handleCinemaClick}
      onMovieListSortTypeClick={handleMovieListSortTypeClick}
      onMovieListViewTypeClick={handleMovieListViewTypeClick}
      onMovieClick={handleMovieClick}
      onStepClick={handleStepClick}
      onDivisionTabClick={handleDivisionTabClick}
      onDateClick={handleDateClick}
      onFilteringTabClick={handleFilteringTabClick}
    />
  );
};

export default TicketingContainer;
