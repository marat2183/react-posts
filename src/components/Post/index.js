import React from 'react';

import ImageContainer from 'components/ImageContainer';

import s from './index.module.scss';

const Post = React.forwardRef(({ id, image, description }, ref) => {
  return (
    <div className={s['post']} ref={ref}>
      <ImageContainer alt="test" src={image} />
    </div>
  );
});

export default Post;
