import React, { useEffect, useState } from 'react';

const client_id = 'b655a4fe1f6b41c285c995b0866bf991'; // Replace with your Spotify client ID
const redirect_uri = '    https://testing-jamming-codecademy-with.netlify.app/callback'; // Replace with your redirect URI
const scopes = 'playlist-read-private playlist-read-collaborative playlist-modify-private playlist-modify-public'; // Scopes for Spotify API

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);

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
      // For this simplified version, we're only displaying the logged-in status.
      // In a real app, you'd exchange the code for an access token here.
      setLoggedIn(true);
      window.history.replaceState({}, document.title, '/'); // Clean up URL
    }
  };

  useEffect(() => {
    handleCallback();
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

  