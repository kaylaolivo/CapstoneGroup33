import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './PlaceStyles.css'; 

const NewPlace = () => {
    const [place, setPlace] = useState({
        name: '',
        location: '',
        zip: ''
    });

    const [places, setPlaces] = useState([]);

    useEffect(() => {
        const fetchPlaces = async () => {
            try {
                const response = await axios.get('http://localhost:8082/places');
                setPlaces(response.data);
            } catch (error) {
                console.error('Error fetching places:', error);
                alert('Failed to fetch places.');
            }
        };

        fetchPlaces();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setPlace({ ...place, [name]: value });
    };

    const submitNewPlace = async (e) => {
        e.preventDefault(); 
        try {
            const response = await axios.post('http://localhost:8082/places', place);
            if (response.status === 201) {
                alert('Place created successfully!');
                setPlaces([...places, response.data]);
                setPlace({ name: '', location: '', zip: '' });
            }
        } catch (error) {
            console.error('Error creating place:', error.response ? error.response.data : error.message);
            alert('Failed to create the place. Please try again.');
        }
    };

    return (
        <div className="page-container">
            <div className="logo-container">
                <img src="https://cdn.bleacherreport.net/images/team_logos/328x328/rutgers_football.png" alt="Rutgers Logo" style={{ width: '200px', height: 'auto' }} />
            </div>
            <div className="form-container">
                <h2>Add your Place</h2>
                <form onSubmit={submitNewPlace}>
                    <input type="text" name="name" placeholder="Name" value={place.name} onChange={handleInputChange} required />
                    <input type="text" name="location" placeholder="Location" value={place.location} onChange={handleInputChange} required />
                    <input type="text" name="zip" placeholder="ZIP Code" value={place.zip} onChange={handleInputChange} required />
                    <button type="submit">Submit</button>
                </form>
            </div>
            <div className="places-list-container">
                <h3>All Available Places</h3>
                <ul>
                    {places.map((place) => (
                        <li key={place._id}>Name: {place.name}, Location: {place.location}, ZIP: {place.zip}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default NewPlace;
