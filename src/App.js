import PostContainer from 'components/PostsContainer';
import LargeList from 'components/LargeList';
import './App.scss';

function App() {
  return (
    <div className="App">
      {/* <PostContainer /> */}
      <div className="App__wrapper">
        <LargeList />
      </div>
    </div>
  );
}

export default App;
