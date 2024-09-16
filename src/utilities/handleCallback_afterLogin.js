export const handleCallback_afterLogin = async (redirect_uri, client_id, client_secret) => {
    const urlParams = new URLSearchParams(window.location.search);
    const authorizationCode = urlParams.get('code');
  
    if (authorizationCode) {
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
  
          // Return the access token to be handled by the caller
          return data.access_token;
        } else {
          console.error('Error fetching access token:', data);
          return null;
        }
      } catch (error) {
        console.error('Network error:', error);
        return null;
      }
    }
    return null;
  };
  