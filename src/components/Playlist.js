import React, { useState, useEffect } from 'react';
import styles from '../styles/Playlist.module.css'

function Playlist ({handleName, playListName, currentPlayList}) {

    return (
        <div className={styles.parentContainerPL}>

            <form className={styles.playlistForm}>
            <div className={styles.titleContainer}>
                <h2 >Playlist: </h2><span className={styles.PlaylistTitle}>{playListName}</span>
            </div>

            <input className={styles.playlistFormInput} type="text" placeholder='Jamlist Name' onChange={handleName} />

            <div >{currentPlayList.map(
            (obj,ident)=>
                <div className={styles.itemListTracks} key={ident}>
                    <p>{obj.name}</p>
                    <p>{obj.artist}</p>
                    <p>{obj.album}</p>
                    <p>{obj.id}</p>
                </div>
            
        )}</div>

            <button type='submit'>Save to Spotify</button>
            </form>
        </div>
    );
};

export default Playlist;