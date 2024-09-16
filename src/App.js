import React, { useEffect, useState } from 'react';

const client_id = 'b655a4fe1f6b41c285c995b0866bf991';
const client_secret = 'ef4d2252594740a2ae1e028c419db8b6'
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
      // Exchange the authorization code for an access token
      try {
        const response = await fetch('https://accounts.spotify.com/api/token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: new URLSearchParams({
            grant_type: 'authorization_code',
            code: authorizationCode,
            redirect_uri,
            client_id,
            client_secret,
          }),
        });

        const data = await response.json();

        if (response.ok) {

          console.log('Access Token:', data.access_token);

          // Store the access token in local storage or a secure place
          localStorage.setItem('access_token', data.access_token);
          setLoggedIn(true);
          window.history.replaceState({}, document.title, '/'); // Clean up URL
        } else {
          console.error('Error fetching access token:', data);
        }
      } catch (error) {
        console.error('Network error:', error);
      }
    }
  };

    // Function to check if the user is already logged in
    const checkLoggedInStatus = () => {
      const token = localStorage.getItem('access_token');
      if (token) {
        setLoggedIn(true);
      }
    };

  useEffect(() => {
    checkLoggedInStatus();
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
  