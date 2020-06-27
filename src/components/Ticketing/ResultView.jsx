import React from 'react';
import ViewGradeIcon from '../ViewGradeIcon';
import classes from './ResultView.module.css';

import { getViewGradeIconOptions } from '../../util';

const ResultView = ({ playSeqs }) => {
  const movieList = [];

  playSeqs.forEach((playSeq) => {
    const movie = movieList.find(
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
      movieList.push(newMovie);
    } else {
      const division = movie.divisions.find(
        (division) =>
          division.FilmCode === playSeq.FilmCode &&
          division.ScreenDivisionCode === playSeq.ScreenDivisionCode
      );
      if (!division) {
        const newDivision = {
          FilmCode: playSeq.FilmCode,
          FilmNameKR: playSeq.FilmNameKR,
          FilmNameUS: playSeq.FilmNameUS,
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
        const time = division.times.find(
          (time) => time.PlaySequence === playSeq.PlaySequence
        );
        if (!time) {
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
    }
  });

  // console.log(movieList);

  // const sampleMovieList = [
  //   {
  //     RepresentationMovieCode: '15449',
  //     MovieNameKR: '1917',
  //     MovieNameUS: '1917',
  //     ViewGradeCode: 15,
  //     divisions: [
  //       {
  //         FilmCode: 200,
  //         FilmNameKR: '2D',
  //         FilmNameUS: '2D',
  //         ScreenDivisionCode: 100,
  //         ScreenDivisionNameKR: '일반',
  //         ScreenDivisionNameUS: '(EN)일반',
  //         ScreenDesc: '본 상영관은 타 상영관과 영화 요금이 동일합니다.',
  //         times: [
  //           {
  //             PlaySequence: 1,
  //             PlayDt: '2020-04-24',
  //             StartTime: '11:00',
  //             EndTime: '11:56',
  //             TotalSeatCount: 175,
  //             BookingSeatCount: 172,
  //             ScreenID: 100407,
  //             ScreenNameKR: '7관',
  //             ScreenNameUS: 'CINEMA 7',
  //           },
  //           {
  //             PlaySequence: 2,
  //             PlayDt: '2020-04-24',
  //             StartTime: '13:00',
  //             EndTime: '13:56',
  //             TotalSeatCount: 175,
  //             BookingSeatCount: 172,
  //             ScreenID: 100407,
  //             ScreenNameKR: '7관',
  //             ScreenNameUS: 'CINEMA 7',
  //           },
  //         ],
  //       },
  //       {
  //         FilmCode: 200,
  //         FilmNameKR: '2D',
  //         FilmNameUS: '2D',
  //         ScreenDivisionCode: 980,
  //         ScreenDivisionNameKR: '수퍼 S',
  //         ScreenDivisionNameUS: '(US)수퍼 S',
  //         ScreenDesc:
  //           '더욱 선명한 화질의 수퍼 S는 일반 요금과 동일한 프로모션이 진행 중입니다. ',
  //         times: [
  //           {
  //             PlaySequence: 1,
  //             PlayDt: '2020-04-24',
  //             StartTime: '11:00',
  //             EndTime: '11:56',
  //             TotalSeatCount: 175,
  //             BookingSeatCount: 172,
  //             ScreenID: 100407,
  //             ScreenNameKR: '7관',
  //             ScreenNameUS: 'CINEMA 7',
  //           },
  //           {
  //             PlaySequence: 2,
  //             PlayDt: '2020-04-24',
  //             StartTime: '13:00',
  //             EndTime: '13:56',
  //             TotalSeatCount: 175,
  //             BookingSeatCount: 172,
  //             ScreenID: 100407,
  //             ScreenNameKR: '7관',
  //             ScreenNameUS: 'CINEMA 7',
  //           },
  //         ],
  //       },
  //     ],
  //   },
  // ];

  return (
    <div className={classes['result-view']}>
      {movieList.map((movie) => {
        const viewGradeIconOptions = getViewGradeIconOptions(
          movie.ViewGradeCode
        );
        return (
          <div key={movie.RepresentationMovieCode} className={classes['movie']}>
            <div className={classes['movie-title']}>
              <ViewGradeIcon
                size={22}
                color={viewGradeIconOptions.color}
                text={viewGradeIconOptions.text}
              />
              <span className={classes['movie-name']}>{movie.MovieNameKR}</span>
            </div>
            {movie.divisions.map((division) => (
              <div
                key={division.ScreenDivisionCode}
                className={classes['division']}
              >
                <div className={classes['division-title']}>
                  {division.ScreenDivisionCode === 100
                    ? `${division.FilmNameKR}`
                    : `${division.FilmNameKR} | ${division.ScreenDesc}`}
                </div>
                {division.times.map((time) => (
                  <div key={time.PlaySequence} className={classes['time']}>
                    <div>{time.StartTime}</div>
                    <div>{`${time.BookingSeatCount} / ${time.TotalSeatCount}`}</div>
                    <div>{`${time.ScreenNameKR}`}</div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
};

export default ResultView;
