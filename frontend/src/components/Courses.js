
import React from 'react';
import { useState, useEffect } from 'react';
import AddCourse from '../components/AddCourse';
import axios from 'axios'

const Courses = () => {
  const [courses, setCourses] = useState([])

  const [modal, setModal] = useState(false);


  useEffect(() => {
    axios.get('http://localhost:8082/courses/returnall')
    .then(courses => setCourses(courses.data))
    .catch(err => console.log(err))
  }, [])

  function newCourse(){
    console.log('adding course')
  }



  return (
    <div className="w-100 vh-100 d-flex justify-content-center align-items-center">
      <div className="w-50">
      <h2>Courses Page</h2>
      <p>This is a basic mockup for the Courses page.</p>
        <table className="table">
          <thead>
            <tr>
              <th>
                Name
              </th>
              <th>
                Code
              </th>
            </tr>
          </thead>
          <tbody>
            {
              courses.map(course => {
               return <tr>
                <td>{course.name}</td>
                <td>{course.code}</td>
               </tr> 
              })
            }
          </tbody>
        </table>
        <AddCourse newCourse={newCourse}/>
        </div>
    </div>
  );
}

export default Courses;
