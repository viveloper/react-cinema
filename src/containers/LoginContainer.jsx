import React from 'react';
import Login from '../components/Login';
import { useSelector, useDispatch } from 'react-redux';
import { login } from '../modules/login';
import { useHistory } from 'react-router-dom';

const LoginContainer = () => {
  const loginState = useSelector((state) => state.login);
  const dispatch = useDispatch();
  const history = useHistory();
  const handleSubmit = (inputs) => {
    const { email, password } = inputs;
    dispatch(login(email, password));
    history.goBack();
  };

  return <Login loginState={loginState} onSubmit={handleSubmit} />;
};

export default LoginContainer;
