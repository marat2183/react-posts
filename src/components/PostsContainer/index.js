import { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

import { getPosts } from 'mockApi/api';

import Post from 'components/Post';
import Loader from 'components/Loader';

import s from './index.module.scss';

const PostContainer = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [needMore, setNeedMore] = useState(false);

  const { ref, inView } = useInView({
    threshold: 0,
    triggerOnce: true
  });

  useEffect(() => {
    setLoading(true);
    getPosts()
      .then((posts) => setPosts((prev) => [...prev, ...posts]))
      .finally(() => {
        setLoading(false);
        setNeedMore(false);
      });
  }, []);

  useEffect(() => {
    if (!inView) return;
    setNeedMore(true);
  }, [inView]);

  useEffect(() => {
    if (!needMore) return;
    getPosts()
      .then((posts) => {
        setPosts((prev) => [...prev, ...posts]);
      })
      .finally(() => {
        setLoading(false);
        setNeedMore(false);
      });
  }, [needMore]);

  return (
    <section className={s['posts']}>
      <div className={s['posts__wrapper']}>
        <h1>Posts</h1>
        <div className={s['posts__list']}>
          {loading ? (
            <Loader />
          ) : (
            <>
              {posts.map((post, index) => {
                if (index === posts.length - 1) {
                  return <Post ref={ref} key={index} id={index} image={post.imageSrc} description={post.description} />;
                }
                return <Post key={index} id={index} image={post.imageSrc} description={post.description} />;
              })}
            </>
          )}
          {needMore ? <Loader /> : <></>}
        </div>
      </div>
    </section>
  );
};

export default PostContainer;
