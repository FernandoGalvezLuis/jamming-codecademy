import React, { useEffect, useState } from 'react';
import { fetchUserProfile } from './utilities/fetchUserProfile'
import { handleCallback_afterLogin } from './utilities/handleCallback_afterLogin'
import { searchSpotify } from './utilities/searchSpotify'
import { checkLoggedInStatus } from './utilities/checkLoggedInStatus';
import SearchBar from './components/SearchBar';
import SearchResults from './components/SearchResults';
import ExistingPlaylists from './components/ExistingPlaylists';
import styles from './styles/App.module.css'

const client_id = 'b655a4fe1f6b41c285c995b0866bf991';
const client_secret = 'ef4d2252594740a2ae1e028c419db8b6'
const redirect_uri = 'https://testing-jamming-codecademy-with.netlify.app/callback';
const scopes = 'playlist-read-private playlist-read-collaborative playlist-modify-private playlist-modify-public';

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [accessToken, setAccessToken] = useState('');
  const [userId, setUserId] = useState('');
  const [userDisplayName, setUserDisplayName] = useState('');
  const [results, setResults] = useState([]);

  handleLogin(client_id, redirect_uri, scopes),

console.log(`${!accessToken} There is no access token`);
console.log(`userId: ${userId}`);


  useEffect(() => {
    checkLoggedInStatus(setLoggedIn, setAccessToken);
    handleCallback_afterLogin(redirect_uri, client_id, client_secret, setLoggedIn, setAccessToken);
  }, []);

  useEffect(() => { fetchUserProfile(accessToken, setUserId, setUserDisplayName) }, [accessToken]);



  return (
    <div>
      {!loggedIn ? (
        <button onClick={handleLogin}>Log in to Spotify</button>
        
      ) : (
        <>
        <p>Logged in</p>
        <h1 className={styles.title}>Jamming</h1>
        <h1>Hello {userDisplayName}!</h1>
        <ExistingPlaylists  accessToken={accessToken} userDisplayName={userDisplayName} />
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
  