import React, { useEffect, useState } from 'react';
import { handleCallback_afterLogin } from './utilities/handleCallback_afterLogin';

const client_id = 'b655a4fe1f6b41c285c995b0866bf991';
const client_secret = 'YOUR_CLIENT_SECRET'; // Move this to a more secure place
const redirect_uri = 'https://testing-jamming-codecademy-with.netlify.app/callback';
const scopes = 'playlist-read-private playlist-read-collaborative playlist-modify-private playlist-modify-public';

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = () => {
    const authorizationUrl = `https://accounts.spotify.com/authorize?response_type=code&client_id=${client_id}&redirect_uri=${encodeURIComponent(redirect_uri)}&scope=${encodeURIComponent(scopes)}`;
    window.location.href = authorizationUrl;
  };

  const checkLoggedInStatus = () => {
    const token = localStorage.getItem('access_token');
    if (token) {
      setLoggedIn(true);
    }
  };

  useEffect(() => {
    const initialize = async () => {
      const token = await handleCallback_afterLogin(redirect_uri, client_id, client_secret);
      if (token) {
        localStorage.setItem('access_token', token);
        setLoggedIn(true);
      }
      checkLoggedInStatus(); // Ensure this is called to reflect the current state
    };

    initialize();
  }, []);

  return (
    <div>
      {loggedIn ? (
        <p>Logged in</p>
      ) : (
        <button onClick={handleLogin}>Log in to Spotify</button>
      )}
    </div>
  );
};

export default App;
  