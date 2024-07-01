import React, { useState, useEffect } from 'react';
import styles from '../styles/Playlist.module.css'

function Playlist ({data}) {

    return (
        <div className={styles.color}>
            <form>
            <button type='submit'>Save to Spotify</button>
            </form>
        </div>
    );
};

export default Playlist;