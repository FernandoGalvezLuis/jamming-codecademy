import React, { useState, useEffect } from 'react';

function Playlist ({data}) {

    return (
        <div>{data.map(
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

export default Playlist;