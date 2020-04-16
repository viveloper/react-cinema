import React from 'react';

import Layout from '../components/Layout';
import Carousel from '../components/Carousel';
import SectionTop5Movies from '../components/Movie/SectionTop5Movies';
import Top5Movies from '../components/Movie/Top5Movies';
import ExhibitionList from '../components/Movie/ExhibitionList';
import Exhibition from '../components/Movie/Exhibition';

import movieData from '../data/movies.json';
import carouselItems from '../data/carouselItems02';

const movies = movieData.Movies.Items[0].Items;

const Movie = () => {
  const top5CurrentMovies = movies
    .filter((movie) => parseInt(movie.DDay) === 0)
    .slice(0, 5);

  const top5PreMovies = movies
    .filter((movie) => parseInt(movie.DDay) > 0)
    .slice(0, 5);

  const arteMovies = movies.slice(1, 4);
  const operaMovies = movies.slice(5, 6);

  return (
    <Layout theme="light">
      <Carousel height={420} items={carouselItems} />

      <SectionTop5Movies>
        <Top5Movies
          title="현재 상영작"
          movies={top5CurrentMovies}
          type="current"
        />
        <Top5Movies title="상영 예정작" movies={top5PreMovies} type="pre" />
      </SectionTop5Movies>

      <ExhibitionList>
        <Exhibition
          type="arte"
          title="아트&컬쳐"
          subTitle="감성을 적시는"
          linkName="아르떼 바로가기"
          movies={arteMovies}
        />
        <Exhibition
          type="opera"
          title="해외명작"
          subTitle="스크린에서 보는"
          linkName="오페라 바로가기"
          movies={operaMovies}
        />
        <Exhibition type="festival" title="인생영화" subTitle="초바시네마의" />
      </ExhibitionList>
    </Layout>
  );
};

export default Movie;
