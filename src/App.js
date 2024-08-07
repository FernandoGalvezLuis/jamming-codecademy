import React, { useState, useEffect } from 'react';
import styles from './styles/App.module.css';  // Import CSS Module
import NewPlaylist from './components/NewPlaylist';
import Track from './components/Track';
import SearchBar from './components/SearchBar';
import SearchResults from './components/SearchResults';
import ExistingPlaylists from './components/ExistingPlaylists';

const client_secret = 'ef4d2252594740a2ae1e028c419db8b6';
const client_id = 'b655a4fe1f6b41c285c995b0866bf991';
const redirect_uri = 'https://testing-jamming-codecademy-with.netlify.app/callback'; // Example redirect URI, adjust as needed
const scopes = 'playlist-read-private playlist-read-collaborative playlist-modify-private playlist-modify-public'; // Scopes required for playlist reading

function App() {
  const [playListName, /*setPlayListName */] = useState('');
  const [currentPlayList, /*setCurrentPlayList*/] = useState([]);
  const [userAccessToken, setUserAccessToken] = useState('');
  const [/*playlists*/, setPlaylists] = useState([]);
  const [results, /*setResults*/] = useState([]);

  // Function to initiate Spotify authentication
  const handleLogin = () => {
    const authorizationUrl = `https://accounts.spotify.com/authorize?response_type=code&client_id=${client_id}&redirect_uri=${encodeURIComponent(redirect_uri)}&scope=${encodeURIComponent(scopes)}`;
    window.location.href = authorizationUrl;
  };

  // Function to handle the callback from Spotify
  const handleCallback = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const authorizationCode = urlParams.get('code');

    if (authorizationCode) {
      const controller = new AbortController(); // Create an AbortController instance
      const signal = controller.signal; // Get the signal for aborting

      try {
        const response = await fetch('https://accounts.spotify.com/api/token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `Basic ${btoa(`${client_id}:${client_secret}`)}`
          },
          body: new URLSearchParams({
            grant_type: 'authorization_code',
            code: authorizationCode,
            redirect_uri: redirect_uri
          }),
          signal // Pass the signal to fetch
        });

        if (!response.ok) {
          throw new Error('Failed to exchange authorization code for access token');
        }

        const data = await response.json();
        setUserAccessToken(data.access_token);
      } catch (error) {
        if (error.name !== 'AbortError') { // Ignore abort errors
          console.error('Error exchanging authorization code:', error);
        }
      }

      // Cleanup function to abort fetch
      return () => controller.abort();
    }
  };

  // Fetch playlists when userAccessToken changes
  useEffect(() => {
    if (userAccessToken) {
      const controller = new AbortController(); // Create an AbortController instance
      const signal = controller.signal; // Get the signal for aborting

      const fetchPlaylists = async () => {
        try {
          const response = await fetch('https://api.spotify.com/v1/me/playlists', {
            headers: {
              'Authorization': `Bearer ${userAccessToken}`
            },
            signal // Pass the signal to fetch
          });

          if (!response.ok) {
            throw new Error('Failed to fetch playlists');
          }

          const data = await response.json();
          setPlaylists(data.items);
        } catch (error) {
          if (error.name !== 'AbortError') { // Ignore abort errors
            console.error('Error fetching playlists:', error);
          }
        }
      };

      fetchPlaylists();

      // Cleanup function to abort fetch
      return () => controller.abort();
    }
  }, [userAccessToken]);

  // Check if we're on the callback URL
  useEffect(() => {
    if (window.location.pathname === '/callback') {
      handleCallback();
    }
  }, []);

  return (
    <div >
      <h1 className={styles.title}>Jamming</h1>
      <ExistingPlaylists  userAccessToken={userAccessToken} />
      <>
      <SearchBar  />
      <button onClick={handleLogin}>Log in to Spotify</button>
      </>
      
 
      <div className={styles.container2}>
        <SearchResults data={results}  />
        <NewPlaylist  playListName={playListName}  currentPlayList={currentPlayList}  />
      </div>

      <Track   />
    </div>
  );
}

export default App;

