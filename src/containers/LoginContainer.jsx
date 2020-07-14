import React from 'react';
import Login from '../components/Login';
import { useSelector, useDispatch } from 'react-redux';
import { login } from '../modules/login';

const LoginContainer = () => {
  const loginState = useSelector((state) => state.login);
  const dispatch = useDispatch();
  const handleSubmit = (inputs) => {
    const { email, password } = inputs;
    dispatch(login(email, password));
  };

  return <Login loginState={loginState} onSubmit={handleSubmit} />;
};

export default LoginContainer;
