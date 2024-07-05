import React, { useState, useEffect} from 'react';
import styles from './styles/App.module.css';  // Import CSS Module
import Playlist from './components/Playlist';
import Track from './components/Track';
import SearchBar from './components/SearchBar';
import SearchResults from './components/SearchResults';
import data from './components/MockData';


function App() {

  const [playListName, setPlayListName] = useState('');
  const [currentPlayList, setCurrentPlayList] = useState([]);

  const handleName = (e) => {
    setPlayListName(e.target.value)
  };

  const handleAddSelectedTrack = (trackId) => {
    
    const selectedTrack = data.find(track => track.id === trackId);
    
    setCurrentPlayList(prev => [...prev, selectedTrack]);
  };

  return (
    <div >
      <h1 className={styles.title}>Jamming</h1>
      <SearchBar  />
 
      <div className={styles.container2}>
        <SearchResults data={data}  handleAddSelectedTrack={handleAddSelectedTrack} />
        <Playlist handleName={handleName} playListName={playListName}  currentPlayList={currentPlayList} />
      </div>

      <Track   />
    </div>
  );
}

export default App;
