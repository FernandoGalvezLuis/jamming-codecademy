  export const handleCallback_afterLogin = async (redirect_uri, client_id, client_secret, setLoggedIn) => {
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