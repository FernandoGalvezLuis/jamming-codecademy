import React, { useState } from 'react';
import styles from '../styles/Playlist.module.css';

function NewPlaylist({ handleName, playListName, currentPlayList, setCurrentPlayList }) {
    const [checkedItems, setCheckedItems] = useState({});

    const toggleCheckbox = (id, index) => {
        const uniqueKey = `${id}-${index}`; // Create a unique key for each instance
        setCheckedItems((prevCheckedItems) => ({
            ...prevCheckedItems,
            [uniqueKey]: !prevCheckedItems[uniqueKey]
        }));
    };

    const handleDeleteSelectedTracks = () => {
        const selectedIds = Object.keys(checkedItems).filter((key) => checkedItems[key]);
        
        // Remove selected tracks from currentPlayList
        const updatedPlayList = currentPlayList.filter((item, index) => {
            const uniqueKey = `${item.id}-${index}`;
            return !selectedIds.includes(uniqueKey);
        });
        
        setCurrentPlayList(updatedPlayList); // Update state in App component
        setCheckedItems({}); // Clear checked items after deletion
    };

    const handleDeleteSelectedTrack = (id, index) => {
        const uniqueKey = `${id}-${index}`; // Create a unique key for the instance
        // Remove the specific track from currentPlayList
        const updatedPlayList = currentPlayList.filter((item, idx) => !(item.id === id && idx === index));
        setCurrentPlayList(updatedPlayList); // Update state in App component
        setCheckedItems((prevCheckedItems) => {
            const { [uniqueKey]: _, ...remaining } = prevCheckedItems; // Remove the deleted track's checked status
            return remaining; // Return the updated checked items
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
    };

    const selectedIds = Object.keys(checkedItems).filter((key) => checkedItems[key]);
    const shouldShowDeleteAllButton = selectedIds.length >= 2;

    return (
        <div className={styles.parentContainerPL}>
            <form className={styles.playlistForm} onSubmit={handleSubmit}>
                <div className={styles.titleContainer}>
                    <h2>Playlist:</h2>
                    <span className={styles.PlaylistTitle}>{playListName}</span>
                </div>

                <input
                    className={styles.playlistFormInput}
                    type="text"
                    placeholder="Jamlist Name"
                    onChange={handleName}
                />

                <div>
                    {currentPlayList.map((item, index) => {
                        const uniqueKey = `${item.id}-${index}`; // Create a unique key for each instance
                        return (
                            <div className={styles.itemListTracks} key={uniqueKey}>
                                <p>{item.name}</p>
                                <p>{item.artists.map((artist) => artist.name).join(', ')}</p>
                                <p>{item.album.name}</p>
                                <img src={item.album.images[0].url} alt="Album Artwork" style={{ width: 200, height: 200 }} />

                                <input
                                    type="checkbox"
                                    checked={checkedItems[uniqueKey] || false} // Use the unique key
                                    onChange={() => toggleCheckbox(item.id, index)} // Pass both id and index
                                />
                                <button
                                    type="button"
                                    onClick={() => handleDeleteSelectedTrack(item.id, index)} // Pass both id and index
                                >
                                    Delete
                                </button>
                            </div>
                        );
                    })}
                </div>
                
                {shouldShowDeleteAllButton && (
                    <button type="button" onClick={handleDeleteSelectedTracks}>
                        Delete all selected
                    </button>
                )}

                <button type="submit">Save to Spotify</button>
            </form>
        </div>
    );
}

export default NewPlaylist;


