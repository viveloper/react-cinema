import axios from 'axios';
import qs from 'querystring';
import carouselItems from './data/carouselItems.json';

const osVersion =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36';
// const osVersion =
//   'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36';

export const getCarouselItems = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(carouselItems);
    }, 200);
  });
};

export const getCinemaData = async () => {
  const requestBody = {
    paramList: JSON.stringify({
      MethodName: 'GetSepcialBannerInMain',
      channelType: 'HO',
      osType: 'W',
      osVersion,
      multiLanguageId: 'KR',
    }),
  };

  const config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  };

  const res = await axios.post(
    '/LCWS/Cinema/CinemaData.aspx',
    qs.stringify(requestBody),
    config
  );
  return res.data;
};

export const getMovies = async () => {
  const data = {
    channelType: 'HO',
    osType: 'W',
    osVersion,
    multiLanguageId: 'KR',
    data: { memberNoOn: '0' },
  };
  const res = await axios.post('/LCAPI/Home/getMovie', data);
  return res.data;
};

export const getMovieList = async (type) => {
  let requestBody;
  if (type === 'current') {
    requestBody = {
      paramList: JSON.stringify({
        MethodName: 'GetMoviesToBe',
        channelType: 'HO',
        osType: 'Chrome',
        osVersion,
        multiLanguageID: 'KR',
        division: 1,
        moviePlayYN: 'Y',
        orderType: 1,
        blockSize: 100,
        pageNo: 1,
      }),
    };
  } else if (type === 'pre') {
    requestBody = {
      paramList: JSON.stringify({
        MethodName: 'GetMoviesToBe',
        channelType: 'HO',
        osType: 'Chrome',
        osVersion,
        multiLanguageID: 'KR',
        division: 1,
        moviePlayYN: 'N',
        orderType: 5,
        blockSize: 100,
        pageNo: 1,
      }),
    };
  } else if (type === 'arte') {
    requestBody = {
      paramList: JSON.stringify({
        MethodName: 'GetMoviesToBe',
        channelType: 'HO',
        osType: 'Chrome',
        osVersion,
        multiLanguageID: 'KR',
        division: 2,
        moviePlayYN: '',
        orderType: 1,
        blockSize: 100,
        pageNo: 1,
        memberOnNo: '',
      }),
    };
  } else if (type === 'opera') {
    requestBody = {
      paramList: JSON.stringify({
        MethodName: 'GetMoviesByOpera',
        channelType: 'HO',
        osType: 'Chrome',
        osVersion,
        multiLanguageID: 'KR',
        blockSize: 100,
        pageNo: 1,
        memberOnNo: '',
      }),
    };
  } else if (type === 'festivals') {
    requestBody = {
      paramList: JSON.stringify({
        MethodName: 'GetFestivals',
        channelType: 'HO',
        osType: 'Chrome',
        osVersion,
        multiLanguageID: 'KR',
        memberOnNo: '',
      }),
    };
  }

  const config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  };

  const res = await axios.post(
    '/LCWS/Movie/MovieData.aspx',
    qs.stringify(requestBody),
    config
  );
  return res.data;
};

export const getMovieDetail = async (movieCode) => {
  const requestBody = {
    paramList: JSON.stringify({
      MethodName: 'GetMovieDetailTOBE',
      channelType: 'HO',
      osType: 'Chrome',
      osVersion,
      multiLanguageID: 'KR',
      representationMovieCode: movieCode,
      memberOnNo: '',
    }),
  };

  const config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  };

  const res = await axios.post(
    '/LCWS/Movie/MovieData.aspx',
    qs.stringify(requestBody),
    config
  );
  return res.data;
};

export const getMovieReview = async (
  movieCode,
  page = 1,
  count = 10,
  sortType = 'recent'
) => {
  const requestBody = {
    paramList: JSON.stringify({
      MethodName: 'GetReviews',
      channelType: 'HO',
      osType: 'Chrome',
      osVersion,
      representationMovieCode: movieCode,
      memberID: '',
      realReviewYN: 'Y',
      sortSeq: sortType === 'recent' ? 1 : 3,
      pageNo: page,
      pageSize: count,
    }),
  };

  const config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  };

  const res = await axios.post(
    '/LCWS/Movie/MovieData.aspx',
    qs.stringify(requestBody),
    config
  );
  return res.data;
};

export const getMovieCastInfo = async (movieCode) => {
  const data = {
    MethodName: 'getMovieCastInfo',
    channelType: 'HO',
    osType: 'Chrome',
    osVersion,
    multiLanguageID: 'KR',
    data: { representationMovieCode: movieCode },
  };
  const res = await axios.post('/LCAPI/Movie/getMovieCastInfo', data);
  return res.data;
};

export const getTicketingData = async () => {
  const requestBody = {
    paramList: JSON.stringify({
      MethodName: 'GetTicketingPageTOBE',
      channelType: 'HO',
      osType: 'W',
      osVersion,
      memberOnNo: '0',
    }),
  };

  const config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  };

  const res = await axios.post(
    '/LCWS/Ticketing/TicketingData.aspx',
    qs.stringify(requestBody),
    config
  );
  return res.data;
};

export const getPlaySequence = async (
  playDate,
  divisionCode,
  detailDivisionCode,
  cinemaId,
  movieCode
) => {
  const requestBody = {
    paramList: JSON.stringify({
      MethodName: 'GetPlaySequence',
      channelType: 'HO',
      osType: 'W',
      osVersion,
      playDate: playDate,
      cinemaID: `${divisionCode}|${detailDivisionCode}|${cinemaId}`,
      representationMovieCode: movieCode,
    }),
  };

  const config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  };

  const res = await axios.post(
    '/LCWS/Ticketing/TicketingData.aspx',
    qs.stringify(requestBody),
    config
  );
  return res.data;
};

export const getInvisibleMoviePlayInfo = async (
  playDate,
  divisionCode,
  detailDivisionCode,
  cinemaId,
  movieCode
) => {
  const requestBody = {
    paramList: JSON.stringify({
      MethodName: 'GetInvisibleMoviePlayInfo',
      channelType: 'HO',
      osType: 'W',
      osVersion,
      cinemaList: `${divisionCode}|${detailDivisionCode}|${cinemaId}`,
      movieCd: movieCode,
      playDt: playDate,
    }),
  };

  const config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  };

  const res = await axios.post(
    '/LCWS/Ticketing/TicketingData.aspx',
    qs.stringify(requestBody),
    config
  );
  return res.data;
};
