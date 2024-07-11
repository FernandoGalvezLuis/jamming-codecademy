import React, { useState } from 'react';
import { FaMagnifyingGlass } from "react-icons/fa6";
import styles from '../styles/SearchBar.module.css'



function SearchBar () {

    const [userSearchTerm, setUserSearchTerm] = useState("");

    const handleInputChange = (e) => {
        setUserSearchTerm(e.target.value);
    };

   /* const handleSubmit = (e) => {
        e.preventDefault();
        // Logic after submission here
    };*/

    return (
        <div className={`${styles.searchContainer}`}>
            <form className={`${styles.center} `}>
            <label htmlFor="searchTerm" className={styles.space}> Search:  </label>
            <input
            className={styles.space}
            type='text'
            id='searchTerm'
            value={userSearchTerm}
            onChange={handleInputChange}
            placeholder='search here!'

            />
            <button type='submit' className={styles.space}>
            <FaMagnifyingGlass />
            </button>
        </form>
        </div>
        
    );
};

export default SearchBar;