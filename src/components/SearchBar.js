import React, { useState, useEffect } from 'react';
import { FaMagnifyingGlass } from "react-icons/fa6";



function SearchBar () {

    const [userSearchTerm, setUserSearchTerm] = useState("");

    const handleInputChange = (e) => {
        setUserSearchTerm(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Logic after submission here
    };

    return (
        <form>
            <label htmlFor="searchTerm"> Search: </label>
            <input
            type='text'
            id='searchTerm'
            value={userSearchTerm}
            onChange={handleInputChange}
            placeholder='search your tunes here!'

            />
            <button type='submit'>
            <FaMagnifyingGlass />
            </button>
        </form>
    );
};

export default SearchBar;