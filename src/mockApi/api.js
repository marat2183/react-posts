import { postGenerator } from 'utils/postGenerator';

const getPosts = () =>
  new Promise((resolve) => {
    setTimeout(() => {
      const generatedPosts = postGenerator(15);
      resolve(generatedPosts);
    }, 2000);
  });

export { getPosts };
