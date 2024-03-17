import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const InformationPage = () => {
  const [user, setUser] = useState(null);
  const [majors, setMajors] = useState([]);
  const [gradeOptions, setGradeOptions] = useState([]);
  const [editMajor, setEditMajor] = useState(false);
  const [editGrade, setEditGrade] = useState(false);
  const [newMajor, setNewMajor] = useState('');
  const [newGrade, setNewGrade] = useState('');
  const { userId } = useParams();

  // Function to fetch user data
  const fetchUser = async () => {
    try {
      const response = await fetch(`/api/users/${userId}`);
      if (!response.ok) {
        throw new Error('User not found');
      }
      const userData = await response.json();
      setUser(userData.user);
    } catch (error) {
      console.error(error);
      // Handle error, e.g., redirect to error page
    }
  };

  useEffect(() => {
    const fetchMajors = async () => {
      try {
        const response = await fetch('/api/majors/getall');
        if (!response.ok) {
          throw new Error('Error fetching majors');
        }
        const data = await response.json();
        setMajors(data);
      } catch (error) {
        console.error(error);
        // Handle error
      }
    };

    const fetchGradeOptions = () => {
      // Generate grade options, e.g., from 2000 to current year
      const currentYear = new Date().getFullYear();
      const years = Array.from({ length: currentYear - 1999 }, (_, index) => currentYear - index);
      setGradeOptions(years);
    };

    fetchMajors();
    fetchGradeOptions();
    fetchUser();
  }, [userId]);

  const handleEditMajor = () => {
    setEditMajor(true);
  };

  const handleEditGrade = () => {
    setEditGrade(true);
  };

  const handleMajorChange = (e) => {
    setNewMajor(e.target.value);
  };

  const handleGradeChange = (e) => {
    setNewGrade(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch(`/api/users/${userId}/update`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          majorId: newMajor,
          grad_year: newGrade,
        }),
      });
      if (!response.ok) {
        throw new Error('Error updating user information');
      }
      // Refresh user data after update
      fetchUser();
      setEditMajor(false);
      setEditGrade(false);
    } catch (error) {
      console.error(error);
      // Handle error
    }
  };

  return (
    <div>
      {user && (
        <div>
          <h1>User Information</h1>
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Major:</strong> 
            {editMajor ? (
              <select value={newMajor} onChange={handleMajorChange}>
                <option value="">Select Major</option>
                {majors.map((major) => (
                  <option key={major._id} value={major._id}>{major.name}</option>
                ))}
              </select>
            ) : (
              <>
                {user.major.name}
                <button onClick={handleEditMajor}>Edit</button>
              </>
            )}
          </p>
          <p><strong>Grade:</strong> 
            {editGrade ? (
              <select value={newGrade} onChange={handleGradeChange}>
                <option value="">Select Grade</option>
                {gradeOptions.map((year) => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            ) : (
              <>
                {user.grad_year}
                <button onClick={handleEditGrade}>Edit</button>
              </>
            )}
          </p>
          {editMajor || editGrade ? (
            <button onClick={handleSubmit}>Submit</button>
          ) : null}
        </div>
      )}
    </div>
  );
};

export default InformationPage;
