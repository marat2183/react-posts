import { postGenerator } from 'utils/postGenerator';

const getPosts = () =>
  new Promise((resolve) => {
    setTimeout(() => {
      const generatedPosts = postGenerator(100);
      resolve(generatedPosts);
    }, 1000);
  });

export { getPosts };
