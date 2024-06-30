import './App.css';
import Playlist from './components/Playlist';
import Track from './components/Track';
import SearchBar from './components/SearchBar';
import SearchResults from './components/SearchResults';
import data from './components/MockData'


function App() {
  return (
    <div className="App">
      <SearchBar />
      <SearchResults />
      <Playlist data={data}/>
      <Track />
      
    </div>
  );
}

export default App;
