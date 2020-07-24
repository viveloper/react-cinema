import axios from 'axios';

export const getCarouselItems = async () => {
  const res = await axios.get('/api/carousel');
  return res.data;
};

export const getMovies = async () => {
  const res = await axios.get('/api/movies');
  return res.data;
};

export const getMovieList = async (type) => {
  const res = await axios.get(`/api/movies?type=${type}`);
  return res.data;
};

export const getMovieDetail = async (movieCode) => {
  const res = await axios.get(`/api/movies/${movieCode}`);
  return res.data;
};

export const getMovieReview = async (
  movieCode,
  page = 1,
  count = 10,
  sortType = 'recent'
) => {
  const res = await axios.get(
    `/api/review?movieCode=${movieCode}&page=${page}&count=${count}&sortType=${sortType}`
  );
  return res.data;
};

export const getTicketingInfo = async () => {
  const res = await axios.get('/api/ticketing');
  return res.data;
};

export const getPlaySequence = async (
  playDate,
  divisionCode,
  detailDivisionCode,
  cinemaId,
  movieCode
) => {
  const res = await axios.get(
    `/api/ticketing/playSequence?playDate=${playDate}&divisionCode=${divisionCode}&detailDivisionCode=${detailDivisionCode}&cinemaId=${cinemaId}${
      movieCode ? `&movieCode=${movieCode}` : ''
    }`
  );
  return res.data;
};

export const getSeats = async (
  cinemaId,
  screenId,
  playDate,
  playSequence,
  screenDivisionCode
) => {
  const res = await axios.get(
    `/api/ticketing/seats?playDate=${playDate}&cinemaId=${cinemaId}&screenDivisionCode=${screenDivisionCode}&screenId=${screenId}&playSequence=${playSequence}`
  );
  return res.data;
};

export const login = async (email, password) => {
  try {
    const res = await axios.post('/api/auth/login', {
      email,
      password,
    });
    return res.data;
  } catch (error) {
    throw error.response && error.response.data
      ? error.response.data.message
      : error.message;
  }
};

export const addReivew = async (token, movieCode, reviewText, evaluation) => {
  const res = await axios.post(
    `/api/review`,
    {
      movieCode,
      reviewText,
      evaluation,
    },
    {
      headers: { Authorization: 'Bearer ' + token },
    }
  );
  return res.data;
};
