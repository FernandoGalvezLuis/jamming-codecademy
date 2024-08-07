export const fetchPlaylists = async (accessToken, setPlaylists) => {
    if (!accessToken) return;
  
    try {
      const response = await fetch('https://api.spotify.com/v1/me/playlists', {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch playlists');
      }
  
      const data = await response.json();
      setPlaylists(data.items); // Update the playlists state directly
    } catch (error) {
      console.error('Error fetching playlists:', error);
      setPlaylists([]); // Optionally clear playlists or set an error state
    }
  };