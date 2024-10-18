export const searchSpotify = async (query, accessToken, setResults) => {

    console.log(`we are calling searchSpotify function ${accessToken}`);

    if (!accessToken) { return }

    /*console.log('we passed the check for accessToken')*/
  
    try {
      const response = await fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });
  
      if (!response.ok) {
        throw new Error('Failed to search Spotify');
      }
  
      const data = await response.json();
      if (data.tracks && data.tracks.items) {
        setResults(data.tracks.items);
      } else {
        console.error('No tracks found.');
      }
    } catch (error) {
      console.error('Error searching Spotify:', error);
    }
  };