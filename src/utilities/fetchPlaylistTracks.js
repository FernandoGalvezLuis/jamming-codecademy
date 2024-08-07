// fetchPlaylistTracks.js
export const fetchPlaylistTracks = async (playlistId, accessToken, setPlaylistTracks) => {
    if (!playlistId || !accessToken) return;
  
    try {
      const response = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch playlist tracks');
      }
  
      const data = await response.json();
      setPlaylistTracks(data.items);
    } catch (error) {
      console.error('Error fetching playlist tracks:', error);
    }
  };
  