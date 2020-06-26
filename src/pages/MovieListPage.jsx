import React from 'react';

import Layout from '../components/Layout';
import MovieListContainer from '../containers/MovieListContainer';

const MovieListPage = ({ history, match }) => {
  const { listType } = match.params;
  return (
    <Layout theme="light">
      <MovieListContainer listType={listType} history={history} />
    </Layout>
  );
};

export default MovieListPage;
