import React from 'react';
import Login from '../components/Login';
import { useSelector, useDispatch } from 'react-redux';
import { login } from '../modules/login';
import { useHistory } from 'react-router-dom';
import { useEffect } from 'react';

const LoginContainer = () => {
  const { loading, data, error } = useSelector((state) => state.login);
  const dispatch = useDispatch();
  const history = useHistory();
  const handleSubmit = (inputs) => {
    const { email, password } = inputs;
    dispatch(login(email, password));
  };

  useEffect(() => {
    if (data) {
      history.goBack();
    }
  }, [data, history]);

  if (loading) return <div>loading...</div>;

  return <Login error={error} onSubmit={handleSubmit} />;
};

export default LoginContainer;
