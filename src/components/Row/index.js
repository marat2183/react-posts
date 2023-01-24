import {useEffect, useRef, useCallback} from 'react';



const Row = ({ data, index, setSize }) => {
  const rowRef = useRef();

  useEffect(() => {
    setSize(index, rowRef.current.getBoundingClientRect().height);
  }, [setSize, index]);

  return (
    <div ref={rowRef} style={{'maxWidth': '300px'}}>
      <h1>{index}</h1>
      <p>{data.description}</p>
    </div>
  );
};

export default Row;