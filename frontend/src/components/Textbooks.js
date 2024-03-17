import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: center;
`;

const FormContainer = styled.div`
  width: 400px;
  background-color: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  margin-bottom: 20px;
  text-align: center;
`;

const Form = styled.form``;

const FormGroup = styled.div`
  margin-bottom: 15px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  font-size: 16px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

function AddTextbook() {
  const [textbookData, setTextbookData] = useState({
    title: '',
    author: '',
    genre: '',
    description: '',
    isbn: '',
    publicationYear: '',
    language: '',
    pageCount: '',
    publisher: '',
    image: null,
    errors: {}
  });

  const validateInputs = () => {
    const errors = {};

    if (!textbookData.title.trim()) {
      errors.title = 'Title is required';
    }

    if (!textbookData.author.trim()) {
      errors.author = 'Author is required';
    }

    if (!textbookData.image) {
      errors.image = 'Image is required';
    } else if (!['image/jpeg', 'image/png'].includes(textbookData.image.type)) {
      errors.image = 'Please upload a valid image file (JPEG or PNG)';
    }

    return errors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTextbookData({
      ...textbookData,
      [name]: value,
      errors: {
        ...textbookData.errors,
        [name]: ''
      }
    });
  };

  const handleImageChange = (e) => {
    setTextbookData({
      ...textbookData,
      image: e.target.files[0],
      errors: {
        ...textbookData.errors,
        image: ''
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const errors = validateInputs();

    if (Object.keys(errors).length === 0) {
      // Form submission logic goes here
      console.log(textbookData);
      setTextbookData({
        title: '',
        author: '',
        genre: '',
        description: '',
        isbn: '',
        publicationYear: '',
        language: '',
        pageCount: '',
        publisher: '',
        image: null,
        errors: {}
      });
    } else {
      setTextbookData({
        ...textbookData,
        errors
      });
    }
  };

  return (
    <Container>
      <FormContainer>
        <Title>Add Textbook</Title>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label>Title *</Label>
            <Input type="text" name="title" value={textbookData.title} onChange={handleChange} />
            {textbookData.errors.title && <p style={{ color: 'red' }}>{textbookData.errors.title}</p>}
          </FormGroup>
          <FormGroup>
            <Label>Author *</Label>
            <Input type="text" name="author" value={textbookData.author} onChange={handleChange} />
            {textbookData.errors.author && <p style={{ color: 'red' }}>{textbookData.errors.author}</p>}
          </FormGroup>
          <FormGroup>
            <Label>Genre</Label>
            <Input type="text" name="genre" value={textbookData.genre} onChange={handleChange} />
          </FormGroup>
          <FormGroup>
            <Label>Description</Label>
            <TextArea rows={3} name="description" value={textbookData.description} onChange={handleChange} />
          </FormGroup>
          <FormGroup>
            <Label>Image *</Label>
            <Input type="file" name="image" onChange={handleImageChange} />
            {textbookData.errors.image && <p style={{ color: 'red' }}>{textbookData.errors.image}</p>}
          </FormGroup>
          <Button type="submit">Add Textbook</Button>
        </Form>
      </FormContainer>
    </Container>
  );
}

export default AddTextbook;
