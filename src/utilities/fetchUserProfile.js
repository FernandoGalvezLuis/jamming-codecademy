export     const fetchUserProfile = async (accessToken, setUserId, setUserDisplayName) => {
    if (!accessToken) return;

    try {
      const response = await fetch('https://api.spotify.com/v1/me', {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });

      console.log('We have passed the mark where we are getting the access token from fetchUserProfile')

      if (!response.ok) {
        throw new Error('Failed to fetch user profile');
      }

      const data = await response.json();
      setUserDisplayName(data.display_name);
      setUserId(data.id); // Set the Spotify user ID
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };