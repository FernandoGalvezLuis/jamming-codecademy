import React, { useState } from 'react';
import { FaMagnifyingGlass } from "react-icons/fa6";
import styles from '../styles/SearchBar.module.css'



function SearchBar ( { onSearch } ) {

    const [query, setQuery] = useState("");

    const handleInputChange = (e) => {
        setQuery(e.target.value);
    };

   const handleSubmit = (e) => {
        console.log("clicked Search button magnifying glass")
        e.preventDefault();
        onSearch(query);
        setQuery('');
    };

    return (
        <div className={`${styles.searchContainer}`}>
            <form onSubmit={handleSubmit} className={`${styles.center} `}>
            <label htmlFor="query" className={styles.space}> Search:  </label>
            <input
            className={styles.space}
            type='text'
            id='query'
            value={query}
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

/*

function SearchBar({ onSearch }) {
    const [query, setQuery] = useState('');
  
    const handleChange = (event) => {
      setQuery(event.target.value);
    };
  
    const handleSubmit = (event) => {
      event.preventDefault();
      onSearch(query);
    };
  
    return (
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={query}
          onChange={handleChange}
          placeholder="Search for an artist, album, or track..."
        />
        <button type="submit">Search</button>
      </form>
    );
  }
  
  export default SearchBar;
  */