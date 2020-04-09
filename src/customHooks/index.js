import { useState } from 'react';

export const useLayerMovieTrailer = () => {
  const [src, setSrc] = useState('');
  const [isActive, setIsActive] = useState(false);
  const handlePlay = (src) => {
    setSrc(src);
    setIsActive(true);
  };
  const handleClose = () => {
    setIsActive(false);
  };

  return {
    src,
    isActive,
    handlePlay,
    handleClose,
  };
};
