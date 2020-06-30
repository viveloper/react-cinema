const axios = require('axios');
const fs = require('fs');

const getMovie = async () => {
  const data = {
    channelType: 'HO',
    osType: 'W',
    osVersion:
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36',
    multiLanguageId: 'KR',
    data: { memberNoOn: '0' },
  };
  const res = await axios.post(
    'https://www.lottecinema.co.kr/LCAPI/Home/getMovie',
    data
  );
  return res.data;
};

const startDownload = async () => {
  // download movies
  const movies = await getMovie();
  fs.writeFileSync('./data/movies.json', JSON.stringify(movies));
  console.log('Movie list download complete.');
};

startDownload();
