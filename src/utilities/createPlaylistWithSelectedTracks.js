// utilities/createPlaylistWithSelectedTracks.js

export const createPlaylistWithSelectedTracks = async (accessToken, userId, playlistName, description, setPlaylists, currentPlayList) => {
  console.log(`currentPlaylist from cretePlaylistsWST: ${currentPlayList}`)
  
  if (!accessToken) return;

  try {
    // Step 1: Create a new playlist
    const createPlaylistResponse = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: playlistName,
        description: description,
        public: true
      })
    });

    if (!createPlaylistResponse.ok) {
      throw new Error('Failed to create playlist');
    }

    const playlistData = await createPlaylistResponse.json();
    const newPlaylistId = playlistData.id;


    setPlaylists(prevPlaylists => [...prevPlaylists, playlistData]);

    // Step 2: Add selected tracks to the newly created playlist
    const urisToAdd = currentPlayList.map(track => track.uri);
    console.log(`urisToAdd: ${urisToAdd}`)
    const addTracksResponse = await fetch(`https://api.spotify.com/v1/playlists/${newPlaylistId}/tracks`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        uris: urisToAdd
      })
    });

    if (!addTracksResponse.ok) {
      throw new Error('createPWST: Failed to add tracks to playlist');
    }

    // Success message can be handled here if needed
  } catch (error) {
    console.error('Error creating playlist with selected tracks:', error);
  }
};
