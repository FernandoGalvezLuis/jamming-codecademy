import React, { useEffect, useState } from 'react';
import { handleCallback_afterLogin } from './utilities/handleCallback_afterLogin'
import { searchSpotify } from './utilities/searchSpotify'
import SearchBar from './components/SearchBar';
import SearchResults from './components/SearchResults';

const client_id = 'b655a4fe1f6b41c285c995b0866bf991';
const client_secret = 'ef4d2252594740a2ae1e028c419db8b6'
const redirect_uri = 'https://testing-jamming-codecademy-with.netlify.app/callback';
const scopes = 'playlist-read-private playlist-read-collaborative playlist-modify-private playlist-modify-public';

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [accessToken, setAccessToken] = useState('');
  const [results, setResults] = useState([]);

  const handleLogin = () => {
    const authorizationUrl = `https://accounts.spotify.com/authorize?response_type=code&client_id=${client_id}&redirect_uri=${encodeURIComponent(redirect_uri)}&scope=${encodeURIComponent(scopes)}`;
    window.location.href = authorizationUrl;
  };

console.log(accessToken);

    // Function to check if the user is already logged in
    const checkLoggedInStatus = () => {
      const token = localStorage.getItem('access_token');
      setAccessToken(token);
  
      if (token) {
        setLoggedIn(true);
      }
    };

  useEffect(() => {
    checkLoggedInStatus();
    handleCallback_afterLogin(redirect_uri, client_id, client_secret, setLoggedIn);
  }, []);



  return (
    <div>
      {!loggedIn ? (
        <button onClick={handleLogin}>Log in to Spotify</button>
        
      ) : (
        <>
        <p>Logged in</p>
        <h1 className={styles.title}>Jamming</h1>
        <SearchBar onSearch={(query) => searchSpotify(query, accessToken, setResults)} />
        <div className={styles.container2}>
        <SearchResults results={results}/>
        </div>

        </>

      )}

    </div>
  );
};

export default App;
  