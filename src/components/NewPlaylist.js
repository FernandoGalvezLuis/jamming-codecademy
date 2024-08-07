import React, { useState } from 'react';
import styles from '../styles/Playlist.module.css'

function Playlist ({handleName, handleDeleteSelectedTrack, playListName, currentPlayList}) {

    
    const [checkedItems, setCheckedItems] = useState({});


    const toggleCheckbox = (id) => {
        setCheckedItems(prevCheckedItems => ({
            ...prevCheckedItems,
            [id]: !prevCheckedItems[id] 
        }));
    };

    const handleDeleteSelectedTracks = () => {

        const selectedIds = Object.keys(checkedItems).filter(key => checkedItems[key]);
        selectedIds.forEach(id => handleDeleteSelectedTrack(id));
        setCheckedItems({}); 
    };

    const handleSubmit = (event) => {
        event.preventDefault();
    };

    const selectedIds = Object.keys(checkedItems).filter(key => checkedItems[key]);
    const shouldShowDeleteAllButton = selectedIds.length >= 2;

    return (
        <div className={styles.parentContainerPL}>

            <form className={styles.playlistForm} onSubmit={handleSubmit}>
            <div className={styles.titleContainer}>
                <h2 >Playlist: </h2><span className={styles.PlaylistTitle}>{playListName}</span>
            </div>

            <input className={styles.playlistFormInput} type="text" placeholder='Jamlist Name' onChange={handleName} />

            <div>
                {currentPlayList.map(item => (
                    <div className={styles.itemListTracks} key={item.key}>
                        <p>{item.name}</p>
                        <p>{item.artist}</p>
                        <p>{item.album}</p>
                        <p>{item.id}</p>
                        <input
                            type='checkbox'
                            checked={checkedItems[item.key] || false}
                            onChange={() => toggleCheckbox(item.key)}
                        />
                        {checkedItems[item.key] && <button onClick={() => handleDeleteSelectedTrack(item.key)}>Delete</button>}
                    </div>
                ))}
        </div>
            {shouldShowDeleteAllButton ? <button onClick={handleDeleteSelectedTracks}>Delete all selected</button> : null }

            <button type='submit'>Save to Spotify</button>
            </form>
        </div>
    );
};

export default Playlist;