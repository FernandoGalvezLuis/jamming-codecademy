import React from 'react';
import styles from '../styles/SearchResults.module.css';

function SearchResults({ results, setCurrentPlayList }) {

    const handleAddSelectedTrack = ( track ) => {
        setCurrentPlayList( prev => [...prev, track]);
    };

    return (
        <div className={styles.color}>
            {results.length === 0 ? (
                <p className={styles.itemListTracks}>No results found or no searches yet. Please try a different search.</p>
            ) : (
                results.map((obj) => (
                    <div className={styles.itemListTracks} key={obj.id}>
                        <p><strong>Name: </strong>{obj.name}</p>
                        <p><strong>Artist: </strong>{obj.artists.map(artist => artist.name).join(', ')}</p>
                        <p><strong>Album: </strong>{obj.album.name}</p>
                        <img src={obj.album.images[0].url} alt="Album Artwork" style={{ width: 200, height: 200 }} />
                        <p><strong>uri: </strong>{obj.uri}</p>
                        <button onClick={() => handleAddSelectedTrack(obj)}>Add to Playlist</button>
                    </div>
                ))
            )}
        </div>
    );
}

export default SearchResults;


/**
 * 
 *       <ul>
        {results.map(result => (
          <li key={result.id}>
            <strong>{result.name}</strong>
            <br />
            Artists: {result.artists.map(artist => artist.name).join(', ')}
            <br />
            Album: {result.album.name}
            <br />
            uri: {result.uri}
            <br />
            <img src={result.album.images[0].url} alt="Album Artwork" style={{ width: 200, height: 200 }} />
            <br />
            <a href={result.external_urls.spotify} target="_blank" rel="noopener noreferrer">Open in Spotify</a>
            <br />
            <button onClick={()=> toggleTrackSelection(result)}>Select</button>
          </li>
        ))}
      </ul>


 */

