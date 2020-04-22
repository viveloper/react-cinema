import React from 'react';
import classes from './Divisions.module.css';

const Divisions = ({
  tab,
  divisions,
  cinemas,
  detailDivisionCode,
  cinemaId,
  onDivisionClick,
  onCinemaClick,
}) => {
  const handleDivisionClick = (e, code) => {
    e.preventDefault();
    onDivisionClick(code);
  };

  const handleCinemaClick = (e, code) => {
    e.preventDefault();
    onCinemaClick(code);
  };
  return (
    <div className={classes['divisions']}>
      <ul className={classes['division-list']}>
        {divisions
          .filter((division) =>
            tab === 'all'
              ? division.DivisionCode === 1
              : division.DivisionCode === 2
          )
          .map((division) => (
            <li
              key={division.DetailDivisionCode}
              className={`${classes['division']} ${
                division.DetailDivisionCode === detailDivisionCode
                  ? classes['active']
                  : ''
              }`}
            >
              <a
                href="##"
                className={classes['division-name']}
                onClick={(e) =>
                  handleDivisionClick(e, division.DetailDivisionCode)
                }
              >
                {division.GroupNameKR}
                <span
                  className={classes['cinema-count']}
                >{`(${division.CinemaCount})`}</span>
                <span className={classes['check-icon']}>
                  <i class="fas fa-check"></i>
                </span>
              </a>
            </li>
          ))}
      </ul>
      <ul className={classes['cinema-list']}>
        {cinemas.map((cinema) => (
          <li
            key={cinema.CinemaID}
            className={`${classes['cinema']} ${
              cinema.CinemaID === cinemaId ? classes['active'] : ''
            }`}
          >
            <a
              href="##"
              className={classes['cinema-name']}
              onClick={(e) => handleCinemaClick(e, cinema.CinemaID)}
            >
              {cinema.CinemaNameKR}
              <span className={classes['check-icon']}>
                <i class="fas fa-check"></i>
              </span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Divisions;
