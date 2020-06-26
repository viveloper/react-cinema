import React from 'react';

import Layout from '../components/Layout';
import MovieDetailContainer from '../containers/MovieDetailContainer';

const MovieDetailPage = ({ history }) => {
  const { movieCode } = history.params;
  return (
    <Layout theme="light">
      <MovieDetailContainer movieCode={movieCode} />
    </Layout>
  );
};

export default MovieDetailPage;
