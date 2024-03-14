
import React from 'react';
import { useState, useEffect } from 'react';
import AddCourse from '../components/AddCourse';
import axios from 'axios'

const Courses = () => {
  const [courses, setCourses] = useState([])
  const [modal, setModal] = useState(false);

  function toggleShow(){
    setModal(!modal)
  }


  useEffect(() => {
    fetch('http://localhost:8082/courses/returnall')
    .then(res =>{
      return res.json();
    })
    .then(data => {
      console.log(data)
    })
  }, [])

  function newCourse(name, code, requiredBooks){
    const data ={name: name, code: code, requiredBooks: requiredBooks}
    const url = 'http://localhost:8082/courses/'
    fetch(url,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
      
    }).then((res) => {
        if(!res.ok){
          throw new Error('Somethinf went wrong');
        }
    }).then((data) => {
      //assume the add was successful
      //hide modal
      //make sure the list is updated
    }).catch((e) =>{
      console.log(e)
    });
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
        <AddCourse newCourse={newCourse} modal={modal} toggleShow={toggleShow}/>
        </div>
    </div>
  );
}

export default Courses;
