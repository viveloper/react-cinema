import React, { useState } from 'react';
import classes from './Carousel.module.css';

const initialItems = [
  {
    name: 'TimeFreak',
    img: 'http://localhost:3000/img/TimeFreak.jpg',
    video: 'http://localhost:3000/img/TimeFreak.mp4',
  },
  {
    name: 'MySpy',
    img: 'http://localhost:3000/img/MySpy.jpg',
    video: 'http://localhost:3000/img/MySpy.mp4',
  },
  {
    name: 'Stray',
    img: 'http://localhost:3000/img/Stray.jpg',
    video: 'http://localhost:3000/img/Stray.mp4',
  },
];

const Carousel = () => {
  const [items, setItems] = useState(initialItems);
  const [activeItem, setActiveItem] = useState(0);

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

  return (
    <section className={classes.carousel}>
      <div className={classes.container}>
        <ul
          className={classes.items}
          style={{ transform: `translateX(${activeItem * -100}%)` }}
        >
          {items.map((item, index) => (
            <li
              key={item.name}
              className={`${classes.item} ${
                index === activeItem ? classes.active : ''
              }`}
            >
              <a href="#">
                <img src={item.img} data-video={item.video} alt="poster" />
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className={classes.nav}>
        <button onClick={handlePrevClick}>
          <span className={classes.prev}>
            <i className="fas fa-angle-left fa-4x"></i>
          </span>
        </button>
        <button onClick={handleNextClick}>
          <span className={classes.next}>
            <i className="fas fa-angle-right fa-4x"></i>
          </span>
        </button>
      </div>
    </section>
  );
};

export default Carousel;
