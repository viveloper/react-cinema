import React from 'react';
import queryString from 'query-string';
import Layout from '../components/Layout';
import Carousel from '../components/Carousel';
import ViewGradeIcon from '../components/ViewGradeIcon';

import { numberWithCommas } from '../util';

import moviesDetail from '../data/moviesDetail.json';
import classes from './MovieDetail.module.css';

const MovieDetail = ({ location }) => {
  const query = queryString.parse(location.search);
  const movieCode = query.movie;
  const movieDetail = moviesDetail.filter(
    (movieDetail) => movieDetail.Movie.RepresentationMovieCode === movieCode
  )[0];

  const carouselItems = movieDetail.Trailer.Items.map((trailer) => ({
    img: trailer.ImageURL,
  }));

  const viewGradeIconOptions = getViewGradeIconOptions(
    movieDetail.Movie.ViewGradeCode
  );

  return (
    <Layout theme="light">
      <section className={classes['carousel']}>
        <Carousel height={560} width={840} items={carouselItems} />
      </section>

      <section className={classes['summary']}>
        <div className={`center ${classes['summary-container']}`}>
          <img
            src={movieDetail.Movie.PosterURL}
            alt="poster"
            width="205"
            height="293"
          />
          <div className={classes['summary-info']}>
            <div className={classes['title']}>
              <ViewGradeIcon
                size={36}
                color={viewGradeIconOptions.color}
                text={viewGradeIconOptions.text}
              />
              <span className={classes['text']}>
                {movieDetail.Movie.MovieNameKR}
              </span>
            </div>
            <ul className={classes['statistics']}>
              <li>
                <span className={classes['statistics-type']}>관람객 평점</span>
                <span className={classes['statistics-value']}>
                  <span className={classes['icon-star']}>
                    <i className="fas fa-star"></i>
                  </span>{' '}
                  {movieDetail.Movie.ViewEvaluation}
                </span>
              </li>
              <li>
                <span className={classes['statistics-type']}>예매율</span>
                <span className={classes['statistics-value']}>
                  {movieDetail.Movie.BookingRate}%
                </span>
              </li>
              <li>
                <span className={classes['statistics-type']}>누적 관객수</span>
                <span className={classes['statistics-value']}>
                  {numberWithCommas(movieDetail.Movie.KOFCustCnt)} 명
                </span>
              </li>
            </ul>
            <ul className={classes['detail-info']}>
              <li>
                <span className={classes['detail-info-type']}>장르</span>
                <span
                  className={classes['detail-info-value']}
                >{`${movieDetail.Movie.MovieGenreNameKR}, ${movieDetail.Movie.MovieGenreNameKR2} / ${movieDetail.Movie.MakingNationNameKR}`}</span>
                <span
                  className={`${classes['detail-info-value']} ${classes['separator']}`}
                >{`${
                  movieDetail.Movie.ReleaseDate.split(' ')[0].split('-')[0]
                }.${
                  movieDetail.Movie.ReleaseDate.split(' ')[0].split('-')[1]
                }.${
                  movieDetail.Movie.ReleaseDate.split(' ')[0].split('-')[2]
                } 개봉`}</span>
                <span
                  className={`${classes['detail-info-value']} ${classes['separator']}`}
                >{`${movieDetail.Movie.PlayTime}분`}</span>
              </li>
              <li>
                <span className={classes['detail-info-type']}>감독</span>
                <span className={classes['detail-info-value']}>
                  {
                    movieDetail.Casting.Items.find(
                      (staff) => staff.Role === '감독'
                    ).StaffName
                  }
                </span>
              </li>
              <li>
                <span className={classes['detail-info-type']}>출연</span>
                <span className={classes['detail-info-value']}>
                  {movieDetail.Casting.Items.filter(
                    (staff) => staff.Role === '배우'
                  )
                    .map((staff) => staff.StaffName)
                    .join(', ')}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className={classes['tabs']}>
        <div className="center">
          <button className={classes['btn-movie-detail']}>영화정보</button>
          <button className={classes['btn-movie-detail']}>
            평점 및 관람평
          </button>
        </div>
      </section>

      <section className={classes['info']}>
        <div className="center">
          <article className={classes['synopsis']}></article>
          <article className={classes['preference']}></article>
          <div className={classes['trailer']}></div>
          <div className={classes['casting']}></div>
        </div>
      </section>

      <section className={classes['review']}></section>
    </Layout>
  );
};

const getViewGradeIconOptions = (viewGradeCode) => {
  const options = {};
  if (viewGradeCode === 0) {
    options.color = '#5BC77E';
    options.text = '전체';
  } else if (viewGradeCode === 12) {
    options.color = '#4DD6FF';
    options.text = '12';
  } else if (viewGradeCode === 15) {
    options.color = '#FFC134';
    options.text = '15';
  } else if (viewGradeCode === 18) {
    options.color = '#ED4C6B';
    options.text = '청불';
  }
  return options;
};

export default MovieDetail;
