import React, { useEffect, useState } from 'react';

const client_id = 'b655a4fe1f6b41c285c995b0866bf991';
const redirect_uri = 'https://testing-jamming-codecademy-with.netlify.app/callback';
const scopes = 'playlist-read-private playlist-read-collaborative playlist-modify-private playlist-modify-public';

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = () => {
    const authorizationUrl = `https://accounts.spotify.com/authorize?response_type=code&client_id=${client_id}&redirect_uri=${encodeURIComponent(redirect_uri)}&scope=${encodeURIComponent(scopes)}`;
    window.location.href = authorizationUrl;
  };

  const handleCallback = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const authorizationCode = urlParams.get('code');

    if (authorizationCode) {
      // For now, we're only displaying the logged-in status.
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
  