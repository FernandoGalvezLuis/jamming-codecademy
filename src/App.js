import React from 'react';
import styles from './styles/App.module.css';  // Import CSS Module
import Playlist from './components/Playlist';
import Track from './components/Track';
import SearchBar from './components/SearchBar';
import SearchResults from './components/SearchResults';
import data from './components/MockData';


function App() {
  return (
    <div >
      <h1 className={styles.title}>Jamming</h1>
      <SearchBar  />
 
      <div className={styles.container2}>
        <SearchResults data={data} />
        <Playlist  />
      </div>

      <Track   />
    </div>
  );
}

export default App;
