import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import { Button, Form } from 'react-bootstrap';
import './Information.css';

const user = {
  _id: "65f5d1a809170c47ce1f24a0",
  username: "114998879432803324810",
  name: "KAYLA OLIVO",
  googleId: "114998879432803324810",
  __v: 0,
  grad_year: 2024,
  major: "Electrical and Computer Engineering"
};

const Information = () => {
  const [userInfo, setUserInfo] = useState(user);
  const [isEditing, setIsEditing] = useState(false);
  const [majors, setMajors] = useState([]);
  const [newMajorName, setNewMajorName] = useState('');
  const gradYears = [...Array(10)].map((_, index) => 2024 + index); // Assuming a range of 10 years for graduation

  useEffect(() => {
    // Fetch all majors from the server
    fetch('http://localhost:8082/api/major/getall')
      .then(response => response.json())
      .then(data => setMajors(data))
      .catch(error => console.error('Error fetching majors:', error));
  }, []);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    // Here you can implement saving changes to the user information
    setIsEditing(false);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserInfo(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleNewMajorChange = (event) => {
    setNewMajorName(event.target.value);
  };

  const handleNewMajorSubmit = () => {
    // Add a new major
    fetch('http://localhost:8082/api/major/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name: newMajorName })
    })
      .then(response => {
        if (response.ok) {
          // Refresh the majors list
          fetch('http://localhost:8082/api/major/getall')
            .then(response => response.json())
            .then(data => setMajors(data))
            .catch(error => console.error('Error fetching majors:', error));
        }
      })
      .catch(error => console.error('Error adding new major:', error));
  };

  return (
    <Layout>
      <div>
        <h2>User Information</h2>
        <Form>
          <Form.Group controlId="formName">
            <Form.Label>Name:</Form.Label>
            <Form.Control type="text" name="name" value={userInfo.name} onChange={handleChange} disabled={!isEditing} />
          </Form.Group>
          <Form.Group controlId="formMajor">
            <Form.Label>Major:</Form.Label>
            {isEditing ? (
              <div>
                <Form.Control as="select" name="major" value={userInfo.major} onChange={handleChange}>
                  {majors.map(major => (
                    <option key={major._id} value={major.name}>{major.name}</option>
                  ))}
                </Form.Control>
                <small className="text-muted">Can't find your major? Enter a new one below.</small>
                <input type="text" value={newMajorName} onChange={handleNewMajorChange} className="form-control mt-2" />
                <Button variant="primary" onClick={handleNewMajorSubmit} className="mt-2">Add Major</Button>
              </div>
            ) : (
              <Form.Control type="text" name="major" value={userInfo.major} disabled />
            )}
          </Form.Group>
          <Form.Group controlId="formGradYear">
            <Form.Label>Graduation Year:</Form.Label>
            {isEditing ? (
              <Form.Control as="select" name="grad_year" value={userInfo.grad_year} onChange={handleChange}>
                {gradYears.map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </Form.Control>
            ) : (
              <Form.Control type="text" name="grad_year" value={userInfo.grad_year} disabled />
            )}
          </Form.Group>
        </Form>
        {isEditing ? (
          <Button variant="primary" onClick={handleSaveClick}>Save</Button>
        ) : (
          <Button variant="secondary" onClick={handleEditClick}>Edit</Button>
        )}
      </div>
    </Layout>
  );
};

export default Information;
