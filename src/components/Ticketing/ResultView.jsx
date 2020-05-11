import React from 'react';
import ViewGradeIcon from '../ViewGradeIcon';
import classes from './ResultView.module.css';

import { getViewGradeIconOptions } from '../../util';

const ResultView = ({ playSeqs }) => {
  const movieTimeGroupList = [];

  playSeqs.forEach((playSeq) => {
    const movie = movieTimeGroupList.find(
      (movieTimeGroup) =>
        movieTimeGroup.RepresentationMovieCode ===
        playSeq.RepresentationMovieCode
    );
    if (!movie) {
      const movieTimeGroup = {
        RepresentationMovieCode: playSeq.RepresentationMovieCode,
        movieName: playSeq.MovieNameKR,
        viewGradeIconOptions: getViewGradeIconOptions(playSeq.ViewGradeCode),
      };
      movieTimeGroupList.push(movieTimeGroup);
    }
  });

  const sampleMovieTimeGroupList = [
    {
      RepresentationMovieCode: '15449',
      MovieNameKR: '1917',
      MovieNameUS: '1917',
      ViewGradeCode: 15,
      divisions: [
        {
          FilmCode: 200,
          FilmNameKR: '2D',
          FilmNameUS: '2D',
          ScreenDivisionCode: 100,
          ScreenDivisionNameKR: '일반',
          ScreenDivisionNameUS: '(EN)일반',
          times: [
            {
              PlayDt: '2020-04-24',
              StartTime: '11:00',
              EndTime: '11:56',
              TotalSeatCount: 175,
              BookingSeatCount: 172,
              ScreenID: 100407,
              ScreenNameKR: '7관',
              ScreenNameUS: 'CINEMA 7',
            },
            {
              PlayDt: '2020-04-24',
              StartTime: '13:00',
              EndTime: '13:56',
              TotalSeatCount: 175,
              BookingSeatCount: 172,
              ScreenID: 100407,
              ScreenNameKR: '7관',
              ScreenNameUS: 'CINEMA 7',
            },
          ],
        },
        {
          FilmCode: 200,
          FilmNameKR: '2D',
          FilmNameUS: '2D',
          ScreenDivisionCode: 980,
          ScreenDivisionNameKR: '수퍼 S',
          ScreenDivisionNameUS: '(US)수퍼 S',
          times: [
            {
              PlayDt: '2020-04-24',
              StartTime: '11:00',
              EndTime: '11:56',
              TotalSeatCount: 175,
              BookingSeatCount: 172,
              ScreenID: 100407,
              ScreenNameKR: '7관',
              ScreenNameUS: 'CINEMA 7',
            },
            {
              PlayDt: '2020-04-24',
              StartTime: '13:00',
              EndTime: '13:56',
              TotalSeatCount: 175,
              BookingSeatCount: 172,
              ScreenID: 100407,
              ScreenNameKR: '7관',
              ScreenNameUS: 'CINEMA 7',
            },
          ],
        },
      ],
    },
  ];

  return (
    <div className={classes['result-view']}>
      {movieTimeGroupList.map((movieTimeGroup) => (
        <div className={classes['movie-time-group']}>
          <div className={classes['movie-time-title']}>
            <ViewGradeIcon
              size={22}
              color={movieTimeGroup.viewGradeIconOptions.color}
              text={movieTimeGroup.viewGradeIconOptions.text}
            />
            <span className={classes['movie-name']}>
              {movieTimeGroup.movieName}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ResultView;
