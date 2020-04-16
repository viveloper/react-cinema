import React, { useState } from 'react';
import queryString from 'query-string';

import Layout from '../components/Layout';
import Carousel from '../components/Carousel';
import Summary from '../components/MovieDetail/Summary';
import PosterImage from '../components/MovieDetail/PosterImage';
import SummaryTitle from '../components/MovieDetail/SummaryTitle';
import SummaryStatistics from '../components/MovieDetail/SummaryStatistics';
import SummaryDetail from '../components/MovieDetail/SummaryDetail';
import SummarySpecialScreen from '../components/MovieDetail/SummarySpecialScreen';
import SummaryAsideMenu from '../components/MovieDetail/SummaryAsideMenu';
import DetailInfo from '../components/MovieDetail/DetailInfo';
import Tabs from '../components/MovieDetail/Tabs';
import MovieInfo from '../components/MovieDetail/MovieInfo';
import Articles from '../components/MovieDetail/Articles';
import Synopsis from '../components/MovieDetail/Synopsis';
import Preference from '../components/MovieDetail/Preference';
import GenderPrefer from '../components/MovieDetail/GenderPrefer';
import AgePrefer from '../components/MovieDetail/AgePrefer';
import Trailer from '../components/MovieDetail/Trailer.jsx';
import Casting from '../components/MovieDetail/Casting';
import ScoreAndReview from '../components/MovieDetail/ScoreAndReview';

import moviesDetail from '../data/moviesDetail.json';

const MovieDetail = ({ location }) => {
  const [activeTab, setActiveTab] = useState('info');

  const query = queryString.parse(location.search);
  const movieCode = query.movie;
  const movieDetail = moviesDetail.filter(
    (movieDetail) => movieDetail.Movie.RepresentationMovieCode === movieCode
  )[0];

  const carouselItems = movieDetail.Trailer.Items.filter(
    (trailer) => trailer.ImageDivisionCode === '1'
  ).map((trailer) => ({
    img: trailer.ImageURL,
  }));

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  return (
    <Layout theme="light">
      <Carousel height={560} width={840} items={carouselItems} />
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

      <DetailInfo>
        <Tabs activeTab={activeTab} onTabClick={handleTabClick} />
        {activeTab === 'info' ? (
          <MovieInfo>
            <Articles>
              <Synopsis synopsisHtml={movieDetail.Movie.SynopsisKR} />
              <Preference>
                <GenderPrefer
                  manPrefer={movieDetail.Movie.ManPrefer}
                  womanPrefer={movieDetail.Movie.WomanPrefer}
                />
                <AgePrefer
                  agePrefer10={movieDetail.Movie.AgePrefer10}
                  agePrefer20={movieDetail.Movie.AgePrefer20}
                  agePrefer30={movieDetail.Movie.AgePrefer30}
                  agePrefer40={movieDetail.Movie.AgePrefer40}
                />
              </Preference>
            </Articles>
            <Trailer items={movieDetail.Trailer.Items} />
            <Casting items={movieDetail.Casting.Items} />
          </MovieInfo>
        ) : (
          <ScoreAndReview />
        )}
      </DetailInfo>
    </Layout>
  );
};

export default MovieDetail;
