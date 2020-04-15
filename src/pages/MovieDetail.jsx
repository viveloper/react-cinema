import React, { useState } from 'react';
import queryString from 'query-string';

import Layout from '../components/Layout';
import PosterCarousel from '../components/MovieDetail/PosterCarousel';
import Summary from '../components/MovieDetail/Summary';
import PosterImage from '../components/MovieDetail/PosterImage';
import SummaryTitle from '../components/MovieDetail/SummaryTitle';
import SummaryStatistics from '../components/MovieDetail/SummaryStatistics';
import SummaryDetail from '../components/MovieDetail/SummaryDetail';
import SummarySpecialScreen from '../components/MovieDetail/SummarySpecialScreen';
import SummaryAsideMenu from '../components/MovieDetail/SummaryAsideMenu';

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

  const [activeTab, setActiveTab] = useState('info');

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  const ageGraphHighlightIndex = getAgeGraphHighlightIndex(movieDetail.Movie);

  return (
    <Layout theme="light">
      <PosterCarousel height={560} width={840} carouselItems={carouselItems} />
      <Summary movieDetail={movieDetail}>
        <PosterImage
          posterUrl={movieDetail.Movie.PosterURL}
          width={205}
          height={293}
        />
        <SummaryTitle
          viewGradeCode={movieDetail.Movie.ViewGradeCode}
          movieName={movieDetail.Movie.MovieNameKR}
        />
        <SummaryStatistics
          viewEvaludation={movieDetail.Movie.ViewEvaluation}
          bookingRate={movieDetail.Movie.BookingRate}
          cumulativeAudience={movieDetail.Movie.KOFCustCnt}
        />
        <SummaryDetail movieDetail={movieDetail} />
        <SummarySpecialScreen
          specialScreenDivisionCode={
            movieDetail.Movie.SpecialScreenDivisionCode
          }
        />
        <SummaryAsideMenu likeCount={movieDetail.Movie.LikeCount} />
      </Summary>

      {/* <DetailInfo /> */}
      <section className={classes['detail-info']}>
        <div className="center">
          {/* <Tabs /> */}
          <div className={classes['tabs']}>
            <button
              className={`${classes['tab']} ${
                activeTab === 'info' ? classes['active'] : ''
              }`}
              onClick={() => handleTabClick('info')}
            >
              영화정보
            </button>
            <button
              className={`${classes['tab']} ${
                activeTab === 'review' ? classes['active'] : ''
              }`}
              onClick={() => handleTabClick('review')}
            >
              평점 및 관람평
            </button>
          </div>

          {activeTab === 'info' ? (
            // <MovieInfo />
            <div className={classes['movie-info']}>
              <div className={classes['articles']}>
                {/* <Synopsis /> */}
                <article
                  className={`${classes['article']} ${classes['synopsis']}`}
                >
                  <h4 className={classes['title']}>시놉시스</h4>
                  <p
                    className={classes['content']}
                    dangerouslySetInnerHTML={{
                      __html: movieDetail.Movie.SynopsisKR,
                    }}
                  ></p>
                </article>
                {/* <Preference /> */}
                <article
                  className={`${classes['article']} ${classes['preference']}`}
                >
                  <h4 className={classes['title']}>관람 선호도</h4>
                  <div className={classes['prefer-group']}>
                    {/* <GenderPrefer /> */}
                    <div
                      className={`${classes['prefer']} ${classes['gender']}`}
                    >
                      <div className={classes['graph']}>
                        <div
                          className={`${classes['bar']} ${classes['male']}`}
                          style={{ height: `${movieDetail.Movie.ManPrefer}%` }}
                        ></div>
                        <div
                          className={`${classes['bar']} ${classes['female']}`}
                          style={{
                            height: `${movieDetail.Movie.WomanPrefer}%`,
                          }}
                        ></div>
                        <span
                          className={`${classes['value']} ${classes['male']}`}
                          style={{ bottom: `${movieDetail.Movie.ManPrefer}%` }}
                        >{`${movieDetail.Movie.ManPrefer}%`}</span>
                        <span
                          className={`${classes['value']} ${classes['female']}`}
                          style={{
                            bottom: `${movieDetail.Movie.WomanPrefer}%`,
                          }}
                        >{`${movieDetail.Movie.WomanPrefer}%`}</span>
                      </div>
                      <div className={classes['keyword']}>
                        <span>남성</span>
                        <span>여성</span>
                      </div>
                    </div>
                    {/* <AgePrefer /> */}
                    <div className={`${classes['prefer']} ${classes['age']}`}>
                      <div className={classes['graph']}>
                        <div
                          className={`${classes['bar']} ${classes['gen10']}`}
                          style={{
                            height: `${movieDetail.Movie.AgePrefer10}%`,
                            backgroundColor: `${
                              ageGraphHighlightIndex === 0 ? '#f51641' : null
                            }`,
                          }}
                        ></div>
                        <div
                          className={`${classes['bar']} ${classes['gen20']}`}
                          style={{
                            height: `${movieDetail.Movie.AgePrefer20}%`,
                            backgroundColor: `${
                              ageGraphHighlightIndex === 1 ? '#f51641' : null
                            }`,
                          }}
                        ></div>
                        <div
                          className={`${classes['bar']} ${classes['gen30']}`}
                          style={{
                            height: `${movieDetail.Movie.AgePrefer30}%`,
                            backgroundColor: `${
                              ageGraphHighlightIndex === 2 ? '#f51641' : null
                            }`,
                          }}
                        ></div>
                        <div
                          className={`${classes['bar']} ${classes['gen40']}`}
                          style={{
                            height: `${movieDetail.Movie.AgePrefer40}%`,
                            backgroundColor: `${
                              ageGraphHighlightIndex === 3 ? '#f51641' : null
                            }`,
                          }}
                        ></div>
                        <span
                          className={`${classes['value']} ${classes['gen10']}`}
                          style={{
                            bottom: `${movieDetail.Movie.AgePrefer10}%`,
                            color: `${
                              ageGraphHighlightIndex === 0 ? '#f51641' : null
                            }`,
                          }}
                        >{`${movieDetail.Movie.AgePrefer10}%`}</span>
                        <span
                          className={`${classes['value']} ${classes['gen20']}`}
                          style={{
                            bottom: `${movieDetail.Movie.AgePrefer20}%`,
                            color: `${
                              ageGraphHighlightIndex === 1 ? '#f51641' : null
                            }`,
                          }}
                        >{`${movieDetail.Movie.AgePrefer20}%`}</span>
                        <span
                          className={`${classes['value']} ${classes['gen30']}`}
                          style={{
                            bottom: `${movieDetail.Movie.AgePrefer30}%`,
                            color: `${
                              ageGraphHighlightIndex === 2 ? '#f51641' : null
                            }`,
                          }}
                        >{`${movieDetail.Movie.AgePrefer30}%`}</span>
                        <span
                          className={`${classes['value']} ${classes['gen40']}`}
                          style={{
                            bottom: `${movieDetail.Movie.AgePrefer40}%`,
                            color: `${
                              ageGraphHighlightIndex === 3 ? '#f51641' : null
                            }`,
                          }}
                        >{`${movieDetail.Movie.AgePrefer40}%`}</span>
                      </div>
                      <div className={classes['keyword']}>
                        <span>10대</span>
                        <span>20대</span>
                        <span>30대</span>
                        <span>40대</span>
                      </div>
                    </div>
                  </div>
                </article>
              </div>
              {/* <TrailerList /> */}
              <div className={classes['trailer']}></div>
              {/* <Casting /> */}
              <div className={classes['casting']}></div>
            </div>
          ) : (
            // <ScoreAndReview />
            <div className={classes['movie-review']}>평점 및 리뷰</div>
          )}
        </div>
      </section>
    </Layout>
  );
};

const getAgeGraphHighlightIndex = (movie) => {
  const agePrefers = [];
  agePrefers.push(movie.AgePrefer10);
  agePrefers.push(movie.AgePrefer20);
  agePrefers.push(movie.AgePrefer30);
  agePrefers.push(movie.AgePrefer40);
  const sortedAgePrefers = [...agePrefers];
  sortedAgePrefers.sort((a, b) => b - a);
  const max = sortedAgePrefers[0];
  return agePrefers.findIndex((item) => item === max);
};

export default MovieDetail;
