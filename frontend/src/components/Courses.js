
import React, { useState, useEffect } from 'react';
import AddCourse from '../components/AddCourse';
import CourseDetail from '../components/CourseDetail';
import '../components/courses.css';

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [modal, setModal] = useState(false);

  function toggleShow(){
    setModal(!modal)
  }

  function removeSelectedCourse(){
    setSelectedCourse(null)
  }


  useEffect(() => {
    fetch('http://localhost:8082/api/courses/returnall')
      .then(res => res.json())
      .then(data => setCourses(data))
      .catch(error => console.error('Error fetching courses:', error));
  }, []);

  function newCourse(name, code, requiredBooks){
    const data ={name: name, code: code, requiredBooks: requiredBooks}
    const url = 'http://localhost:8082/api/courses/'
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


  const handleCourseClick = (course) => {
    setSelectedCourse(course);
  };

  return (
    <div className="w-100 vh-100 d-flex justify-content-center align-items-center">
      <div className="w-50">
        <h2>Courses Page</h2>
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Code</th>
            </tr>
          </thead>
          <tbody>
            {courses.map(course => (
              <tr key={course._id} onClick={() => handleCourseClick(course)}>
                <td className="course" style={{ cursor: 'pointer' }}>{course.name}</td>
                <td className="course" style={{ cursor: 'pointer' }}>{course.code}</td>
              </tr> 
            ))}
          </tbody>
        </table>
        <AddCourse newCourse={newCourse} modal={modal} toggleShow={toggleShow} />
      </div>
      {selectedCourse && <CourseDetail course={selectedCourse} modal={modal} toggleShow={toggleShow} setSelectedCourse={removeSelectedCourse}/>}
    </div>
  );
}

export default Courses;
