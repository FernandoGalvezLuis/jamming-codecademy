import React, { useState, useEffect } from 'react';
import styles from '../styles/SearchResults.module.css'

function SearchResults ({data, handleAddSelectedTrack}) {

    return (
        <div className={styles.color}>{data.map(
            (obj,ident)=>
                <div className={styles.itemListTracks} key={ident}>
                    <p>{obj.name}</p>
                    <p>{obj.artist}</p>
                    <p>{obj.album}</p>
                    <p>{obj.id}</p>
                    <button onClick={() => handleAddSelectedTrack(obj.id)}>Add to Playlist</button>
                </div>
            
        )}</div>
    );
};

export default SearchResults;

