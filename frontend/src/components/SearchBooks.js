import React, { useState } from 'react';
import axios from 'axios';

const SearchBooks = ({ fetchBooks }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = async () => {
    try {
      const res = await axios.get(`http://localhost:8082/api/books?search=${searchQuery}`);
      fetchBooks(res.data);
    } catch (err) {
      console.error(err);
      // Handle error fetching books
    }
  };

  return (
    <div>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Enter search query"
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default SearchBooks;
