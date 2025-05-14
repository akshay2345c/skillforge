import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import API from '../api/axiosInstance';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';

const CreateCourse = () => {
  const { user } = useSelector((state) => state.auth);

  const validationSchema = Yup.object({
    title: Yup.string().required('Title is required'),
    description: Yup.string().required('Description is required'),
    price: Yup.number().required('Price is required'),
    category: Yup.string().required('Category is required'),
    thumbnail: Yup.string().url('Must be a valid URL').required('Thumbnail URL is required'),
  });

  const handleSubmit = async (values, { resetForm }) => {
    const fallbackUserId = '665a9d1234567890abc12345'; // 🛠️ Replace with real one from your DB

    const payload = {
      ...values,
      createdBy: user?._id || fallbackUserId,
    };

    console.log('Submitting course with payload:', payload);

    try {
      const response = await API.post('/courses', payload);
      console.log('Response:', response.data);

      toast.success('Course created successfully!');
      resetForm();
    } catch (error) {
      console.error('Error:', error.response?.data || error.message);
      toast.error(error.response?.data?.message || 'Failed to create course');
    }
  };

  return (
    <div>
      <h2>Create New Course</h2>
      <Formik
        initialValues={{ title: '', description: '', price: '', category: '', thumbnail: '' }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <label>Title</label>
          <Field name="title" placeholder="Course title" />
          <ErrorMessage name="title" component="div" className="error" />

          <label>Description</label>
          <Field name="description" placeholder="Course description" />
          <ErrorMessage name="description" component="div" className="error" />

          <label>Price</label>
          <Field name="price" type="number" placeholder="499" />
          <ErrorMessage name="price" component="div" className="error" />

          <label>Category</label>
          <Field name="category" placeholder="Web Development" />
          <ErrorMessage name="category" component="div" className="error" />

          <label>Thumbnail URL</label>
          <Field name="thumbnail" placeholder="https://..." />
          <ErrorMessage name="thumbnail" component="div" className="error" />

          <button type="submit">Create Course</button>
        </Form>
      </Formik>
    </div>
  );
};

export default CreateCourse;
