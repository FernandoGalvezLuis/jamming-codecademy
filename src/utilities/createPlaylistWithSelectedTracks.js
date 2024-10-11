// utilities/createPlaylistWithSelectedTracks.js

export const createPlaylistWithSelectedTracks = async (accessToken, userId, playlistName, tracks) => {
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
        description: 'A new playlist created from the app',
        public: true
      })
    });

    if (!createPlaylistResponse.ok) {
      throw new Error('Failed to create playlist');
    }

    const playlistData = await createPlaylistResponse.json();
    const newPlaylistId = playlistData.id;

    // Step 2: Add selected tracks to the newly created playlist
    const urisToAdd = tracks.map(track => track.uri);
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
      throw new Error('Failed to add tracks to playlist');
    }

    // Success message can be handled here if needed
  } catch (error) {
    console.error('Error creating playlist with selected tracks:', error);
  }
};
