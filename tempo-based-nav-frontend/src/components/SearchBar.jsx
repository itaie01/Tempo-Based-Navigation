import axios from 'axios'
import { useEffect } from 'react'
import { useState } from 'react'

const SearchBar = ({ label, searchQuery, handleQueryChange, handleKeyPress}) => {
    return (
        <div>
            {label}: 
            <input type="text" placeholder="Search location" value={searchQuery} onChange={handleQueryChange} onKeyDown={handleKeyPress} />
        </div>
    )
}

export default SearchBar