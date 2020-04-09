import React, { useState, useEffect } from 'react';
import classes from './Carousel.module.css';
import LayerMovieTrailer from './LayerMovieTrailer';
import { useLayerMovieTrailer } from '../customHooks';

const Carousel = ({ theme, height, items }) => {
  const [activeItem, setActiveItem] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      handleNextClick();
    }, 5000);
    return () => {
      clearInterval(interval);
    };
  });

  const handlePrevClick = () => {
    const prevIndex =
      (activeItem - 1 < 0 ? items.length + (activeItem - 1) : activeItem - 1) %
      items.length;
    setActiveItem(prevIndex);
  };

  const handleNextClick = () => {
    const nextIndex = (activeItem + 1) % items.length;
    setActiveItem(nextIndex);
  };

  const handleImgClick = (e, index) => {
    e.preventDefault();
    handlePlay(items[index].video);
  };

  const { src, isActive, handlePlay, handleClose } = useLayerMovieTrailer();

  return (
    <section
      className={`${classes.carousel} ${
        theme === 'gradient' ? `${classes.gradient}` : ''
      }`}
    >
      <div className={classes.container}>
        <ul
          className={classes.items}
          style={{ transform: `translateX(${activeItem * -100}%)` }}
        >
          {items.map((item, index) => (
            <li
              key={item.RepresentationMovieCode}
              className={`${classes.item} ${
                index === activeItem ? classes.active : ''
              }`}
            >
              <a href="#" onClick={(e) => handleImgClick(e, index)}>
                <img src={item.img} alt="poster" height={height} />
              </a>
            </li>
          ))}
        </ul>
      </div>

      <button
        className={`${classes.btnNav} ${classes.btnNavPrev}`}
        onClick={handlePrevClick}
      >
        <span className={classes.prev}>
          <i className="fas fa-angle-left fa-4x"></i>
        </span>
      </button>
      <button
        className={`${classes.btnNav} ${classes.btnNavNext}`}
        onClick={handleNextClick}
      >
        <span className={classes.next}>
          <i className="fas fa-angle-right fa-4x"></i>
        </span>
      </button>

      <LayerMovieTrailer src={src} isActive={isActive} onClose={handleClose} />
    </section>
  );
};

export default Carousel;
