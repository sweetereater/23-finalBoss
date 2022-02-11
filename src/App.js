import { useSelector } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { getAuthors } from './store/features/authors/authorsSelectors';
import { useState } from 'react'
import ReactJkMusicPlayer from 'react-jinke-music-player'
import 'react-jinke-music-player/assets/index.css'

import Login from './components/Login';
import Wrapper from './components/Wrapper';

function App() {
  const [audioList, setAudioList] = useState([])
  const [playIndex, setPlayIndex] = useState(0);
  const authors = useSelector(getAuthors);
  const accessToken = new URLSearchParams(window.location.hash).get('#access_token');
  const onIndexChange = (index) => () => {
    setPlayIndex(index);
  }

  return (
    <div>
      {accessToken ? <Wrapper accessToken={accessToken} onIndexChange={onIndexChange} /> : <Login />}
      <ReactJkMusicPlayer audioLists={audioList} playIndex={playIndex} />
    </div>
  )
}

export default App;
