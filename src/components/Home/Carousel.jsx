import React from 'react';
import classes from './Carousel.module.css';

const Carousel = () => {
  return (
    <div className={classes.carousel}>
      <div className={classes.container}>
        <ul>
          <li className={`${classes.item} ${classes.active}`}>
            <a href="#">
              <img
                src="http://localhost:3000/img/TimeFreak.jpg"
                data-video="http://localhost:3000/img/TimeFreak.mp4"
                alt="poster"
              />
            </a>
          </li>
          <li className={`${classes.item}`}>
            <a href="#">
              <img
                src="http://localhost:3000/img/MySpy.jpg"
                data-video="http://localhost:3000/img/MySpy.mp4"
                alt="poster"
              />
            </a>
          </li>
        </ul>
      </div>
      <div className={classes.nav}>
        <button>
          <span className={classes.prev}>
            <i className="fas fa-angle-left fa-4x"></i>
          </span>
        </button>
        <button>
          <span className={classes.next}>
            <i className="fas fa-angle-right fa-4x"></i>
          </span>
        </button>
      </div>
    </div>
  );
};

export default Carousel;
