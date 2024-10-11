import React, { useState, useEffect } from 'react';
import { fetchPlaylistTracks } from '../utilities/fetchPlaylistTracks';
import { fetchPlaylists } from '../utilities/fetchPlaylists';
import styles from '../styles/Existing_Playlists.module.css'




function ExistingPlaylists ({accessToken, userDisplayName, playlists, setPlaylists}) {


  //  const [userDisplayName, /*setUserDisplayName*/] = useState(''); 

    
    const [selectedPlaylist, setSelectedPlaylist] = useState(null);
    const [playlistTracks, setPlaylistTracks] = useState([]);
 


    useEffect(  () => {  accessToken && fetchPlaylists(accessToken, setPlaylists)  }, [accessToken] );  
    // Fetch playlists when accessToken changes


    useEffect(() => {  fetchPlaylistTracks(selectedPlaylist?.id, accessToken, setPlaylistTracks);   }, [selectedPlaylist, accessToken]); 
    //Fetch tracks from the selectedPlaylist to display

    const handleClickPlaylist = (playlist) => {   setSelectedPlaylist(playlist);    };



    return (
        <div className={styles.ExistingPlaylistContainer} >


                    {userDisplayName && <h2 onClick={() => setSelectedPlaylist('')}>{userDisplayName}'s Playlists</h2>}
        <div >
          <ul className="playlist-list">
            {playlists.map(playlist => (
              <li className={styles.ExistingPlaylistTracks} key={playlist.id} onClick={() => handleClickPlaylist(playlist)}>
                <strong>{playlist.name}</strong>
                {playlist.description && <p>{playlist.description}</p>}
              </li>
            ))}
          </ul>


          </div>
          {selectedPlaylist && (
          <div className="playlist-tracks">
            <h3>Tracks in {selectedPlaylist.name}</h3>
            <ul>
              {playlistTracks.map((track, index) => (
                <li key={index}>
                  {track.track.name} - {track.track.artists.map(artist => artist.name).join(', ')}
                </li>
              ))}
            </ul>
          </div>
        )}


        </div>

    );
};

export default ExistingPlaylists;