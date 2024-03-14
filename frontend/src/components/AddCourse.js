
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

function AddCourse(props) {
    const [course, setCourse] = useState({
        name: "",
        code: "",
        requiredBooks: ""
    });

    const [show, setShow] = useState(props.modal);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setCourse({
            ...course,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        props.newCourse(course.name, course.code, course.requiredBooks);
        handleClose();
    };

    return (
        <>
            <Button variant="primary" onClick={props.toggleShow}>
                Add Course
            </Button>

            <Modal show={props.modal} onHide={handleClose} backdrop={false}>
                <Modal.Header closeButton onClick={props.toggleShow}>
                    <Modal.Title>Add Course</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Course Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="CapStone"
                                autoFocus
                                name="name"
                                value={course.name}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Course Code</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="CS101"
                                name="code"
                                value={course.code}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Required Books</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Book1, Book2"
                                name="requiredBooks"
                                value={course.requiredBooks}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={props.toggleShow}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSubmit}>
                        Submit
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default AddCourse;