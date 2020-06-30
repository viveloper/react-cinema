// import playSeqsInfo from './data/playSeqs.json';
import playSeqsInfo from './data/playSeqs2.json';
// import playSeqsInfo from './data/playSeqsSample.json';

export const getPlaySeqs = (playDate, cinemaId, movieCode) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!playDate || !cinemaId) {
        resolve(null);
      } else {
        const playSeqs = playSeqsInfo.PlaySeqs.Items.filter(
          (item) => item.PlayDt === playDate
        ).filter((item) => item.CinemaID === cinemaId);
        resolve(
          !movieCode
            ? playSeqs
            : playSeqs.filter(
                (item) => item.RepresentationMovieCode === movieCode
              )
        );
      }
    }, 300);
  });
};
