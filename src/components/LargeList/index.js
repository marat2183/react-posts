import {useEffect, useRef, useCallback, useState} from 'react';
import { VariableSizeList } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import InfiniteLoader from 'react-window-infinite-loader';
import { useInView } from 'react-intersection-observer';

import { getPosts } from 'mockApi/api';

import { postGenerator } from 'utils/postGenerator';

import Row from 'components/Row';

import s from './index.module.scss';


// const initialPosts = postGenerator(10000)

const LargeList = () => {
  const [posts, setPosts] = useState([]);
  const [needMore, setNeedMore] = useState(false);
  const [loading, setLoading] = useState(false);

  const listRef = useRef(null);
  const sizeMap = useRef({});

  const { ref: testRef, inView } = useInView({
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

  const setSize = useCallback((index, size) => {
    sizeMap.current = { ...sizeMap.current, [index]: size };
    // listRef.current.resetAfterIndex(index);
  }, []);
  
  const getSize = index => sizeMap.current[index] || 50;

  const loadMoreItems = () => {
    if (!needMore) return;

    setLoading(true);
    getPosts()
      .then((posts) => setPosts((prev) => [...prev, ...posts]))
      .finally(() => {
        setLoading(false);
        setNeedMore(false);
      });
  };

  return (
    <>
      {
        loading ? <p>Loading...</p> : <></>
      }
      <div className={s['list']}>
        <AutoSizer>
          {({ width, height }) => (
            <InfiniteLoader
              isItemLoaded={index => index < posts.length}
              itemCount={posts.length}
              loadMoreItems={loadMoreItems}
            >
              {({ onItemsRendered, ref: temp }) => (
                <VariableSizeList
                  height={height}
                  width={width}
                  itemCount={posts.length}
                  itemSize={getSize}
                  onItemsRendered={onItemsRendered}
                  ref={temp}
                >
                  {({ index, style }) => {
                    return (
                      <div style={style}>
                        {
                          index === posts.length - 1 ?
                            <Row ref={testRef} data={posts[index]} index={index} setSize={setSize} /> :
                            <Row data={posts[index]} index={index} setSize={setSize} />
                        }
                      </div>
                    );
                  }}
                </VariableSizeList>
              )}
            </InfiniteLoader>
          )}
        </AutoSizer>
      </div>
    </>
  );
};

export default LargeList;