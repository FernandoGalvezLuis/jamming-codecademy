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

    const uniqueKey = selectedTrack.id + '_' + Math.random().toString(36).substr(2, 9);
    
    setCurrentPlayList(prev => [...prev, { ...selectedTrack, key: uniqueKey }]);
  };

    const handleDeleteSelectedTrack = (selectedKey) => {
      setCurrentPlayList(prev => prev.filter(item => item.key !== selectedKey));
  };


  return (
    <div >
      <h1 className={styles.title}>Jamming</h1>
      <SearchBar  />
 
      <div className={styles.container2}>
        <SearchResults data={data}  handleAddSelectedTrack={handleAddSelectedTrack} />
        <Playlist handleName={handleName} playListName={playListName}  currentPlayList={currentPlayList} handleDeleteSelectedTrack={handleDeleteSelectedTrack} />
      </div>

      <Track   />
    </div>
  );
}

export default App;
