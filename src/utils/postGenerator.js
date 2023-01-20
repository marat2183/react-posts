import { imagesUrls, descriptions } from 'utils/constants';

const maxRandomImageIndex = 10;
const maxRandomDescriptionIndex = 10;

const getRandomInt = (max) => {
  return Math.floor(Math.random() * max);
};

const postGenerator = (numOfPosts = 10) => {
  let posts = [];
  for (let i = 0; i < numOfPosts; i++) {
    const randomImageIndex = getRandomInt(maxRandomImageIndex);
    const randomDescriptionIndex = getRandomInt(maxRandomDescriptionIndex);
    posts = [
      ...posts,
      {
        imageSrc: imagesUrls[randomImageIndex],
        description: descriptions[randomDescriptionIndex]
      }
    ];
  }
  return posts;
};

export { postGenerator };
