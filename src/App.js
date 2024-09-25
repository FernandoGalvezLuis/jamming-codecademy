import React, { useEffect, useState } from 'react';
import { fetchUserProfile } from './utilities/fetchUserProfile'
import { handleCallback_afterLogin } from './utilities/handleCallback_afterLogin'
import { searchSpotify } from './utilities/searchSpotify'
import { checkLoggedInStatus } from './utilities/checkLoggedInStatus';
import { handleLogin } from './utilities/handleLogin';
import SearchBar from './components/SearchBar';
import SearchResults from './components/SearchResults';
import ExistingPlaylists from './components/ExistingPlaylists';
import styles from './styles/App.module.css'

const client_id = process.env.REACT_APP_CLIENT_ID;
const client_secret = process.env.REACT_APP_CLIENT_SECRET;
const redirect_uri = process.env.REACT_APP_REDIRECT_URI;
const scopes = process.env.REACT_APP_SCOPES;

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [accessToken, setAccessToken] = useState('');
  const [userId, setUserId] = useState('');
  const [userDisplayName, setUserDisplayName] = useState('');
  const [results, setResults] = useState([]);

console.log(`${!accessToken} There is no access token`);
console.log(`userId: ${userId}`);

  useEffect(() => { checkLoggedInStatus(setLoggedIn, setAccessToken); handleCallback_afterLogin(redirect_uri, client_id, client_secret, setLoggedIn, setAccessToken); }, []);

  useEffect(() => { fetchUserProfile(accessToken, setUserId, setUserDisplayName) }, [accessToken]);

  return (
    <div>
      {!loggedIn ? (
        <button onClick={() => handleLogin(client_id, redirect_uri, scopes)}>Log in to Spotify</button>
        
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