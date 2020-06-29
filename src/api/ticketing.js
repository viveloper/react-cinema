import ticketingInfo from './data/ticketingInfo.json';

export const getTicketingInfo = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const areaDivisions = ticketingInfo.CinemaDivison.AreaDivisions.Items;
      const specialTypeDivisions =
        ticketingInfo.CinemaDivison.SpecialTypeDivisions.Items;
      const cinemas = ticketingInfo.Cinemas.Cinemas.Items;
      const movies = ticketingInfo.Movies.Movies.Items.filter(
        (movie) => movie.BookingYN === 'Y'
      );
      const playDates = ticketingInfo.MoviePlayDates.Items.Items.filter(
        (date) => date.IsPlayDate === 'Y'
      );

      resolve({
        areaDivisions,
        specialTypeDivisions,
        cinemas,
        movies,
        playDates,
      });
    }, 300);
  });
};

// export const getDivisions = () => {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       const areaDivisions = ticketingInfo.CinemaDivison.AreaDivisions.Items;
//       const specialTypeDivisions =
//         ticketingInfo.CinemaDivison.SpecialTypeDivisions.Items;
//       const divisions = [...areaDivisions, ...specialTypeDivisions];
//       resolve(divisions);
//     }, 300);
//   });
// };

// export const getAreaDivisions = () => {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve(ticketingInfo.CinemaDivison.AreaDivisions.Items);
//     }, 300);
//   });
// };

// export const getSpecialTypeDivisions = () => {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve(ticketingInfo.CinemaDivison.SpecialTypeDivisions.Items);
//     }, 300);
//   });
// };

// export const getCinemas = (detailDivisionCode) => {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve(
//         ticketingInfo.Cinemas.Cinemas.Items.filter(
//           (cinema) => cinema.DetailDivisionCode === detailDivisionCode
//         )
//       );
//     }, 300);
//   });
// };

// export const getMovies = () => {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve(
//         ticketingInfo.Movies.Movies.Items.filter(
//           (movie) => movie.BookingYN === 'Y'
//         )
//       );
//     }, 300);
//   });
// };

// export const getPlayDates = () => {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve(
//         ticketingInfo.MoviePlayDates.Items.Items.filter(
//           (date) => date.IsPlayDate === 'Y'
//         )
//       );
//     }, 300);
//   });
// };

// export const getPlaySeqs = () => {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve(playSeqsInfo.PlaySeqs.Items);
//     }, 300);
//   });
// };
