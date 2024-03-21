import React, { useState } from 'react';
import axios from 'axios'; 

const NewPlace = () => {
  const [place, setPlace] = useState({
    name: '',
    location: '',
    zip: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPlace({ ...place, [name]: value });
  };

  const submitNewPlace = async (e) => {
    e.preventDefault(); 
    try {
      // Corrected URL to match your backend endpoint
      const response = await axios.post('http://localhost:8082/places', place);
      if (response.status === 201) {
        alert('Place created successfully!');
        // Reset the form state
        setPlace({ name: '', location: '', zip: '' });
      }
    } catch (error) {
      // Improved error handling
      console.error('Error creating place:', error.response ? error.response.data : error.message);
      alert('Failed to create the place. Please try again.');
    }
  };

  return (
    <div>
      <h2>Create a New Place</h2>
      <form onSubmit={submitNewPlace}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={place.name}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={place.location}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="zip"
          placeholder="ZIP Code"
          value={place.zip}
          onChange={handleInputChange}
          required
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default NewPlace;
