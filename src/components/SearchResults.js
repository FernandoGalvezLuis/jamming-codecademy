import React, { useState, useEffect } from 'react';
import styles from '../styles/SearchResults.module.css'

function SearchResults ({data}) {

    return (
        <div className={styles.color}>{data.map(
            (obj,ident)=>
                <div key={ident}>
                    <p>{obj.name}</p>
                    <p>{obj.artist}</p>
                    <p>{obj.album}</p>
                    <p>{obj.id}</p>
                </div>
            
        )}</div>
    );
};

export default SearchResults;