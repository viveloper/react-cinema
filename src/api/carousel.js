import carouselItems from './data/carouselItems.json';

export const getCarouselItems = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(carouselItems);
    }, 300);
  });
};
