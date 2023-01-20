import React from 'react';

import { useInView } from 'react-intersection-observer';

import s from './index.module.scss';

const ImageContainer = ({ src, alt }) => {
  const { ref, inView } = useInView({
    threshold: 0.25,
    triggerOnce: true
  });

  return (
    <div className={s['image-wrapper']} ref={ref}>
      {inView ? <img className={s['image']} src={src} alt={alt} /> : <div className={s['image-skeleton']}></div>}
    </div>
  );
};

export default ImageContainer;
