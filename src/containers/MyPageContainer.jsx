import React, { useEffect, useCallback } from 'react';
import MyPage from '../components/MyPage';
import { useSelector, useDispatch } from 'react-redux';
import { getUserTicketing } from '../modules/userTicketing';

const MyPageContainer = () => {
  const { loading, data: userTicketingList, error } = useSelector(
    (state) => state.userTicketing.userTicketingList
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserTicketing());
  }, [dispatch]);

  const handleMovieCancel = useCallback((ticketingId) => {
    console.log(ticketingId);
  }, []);

  if (loading) return <div>loading...</div>;
  if (error) return <div>error!</div>;
  if (!userTicketingList) return null;

  return (
    <MyPage
      userTicketingList={userTicketingList}
      onMovieCancel={handleMovieCancel}
    />
  );
};

export default MyPageContainer;
