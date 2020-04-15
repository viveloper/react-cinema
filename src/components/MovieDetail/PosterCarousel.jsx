import React from 'react';
import Carousel from '../Carousel';

const PosterCarousel = ({ height, width, carouselItems }) => {
  return (
    <section>
      <Carousel height={height} width={width} items={carouselItems} />
    </section>
  );
};

export default PosterCarousel;
