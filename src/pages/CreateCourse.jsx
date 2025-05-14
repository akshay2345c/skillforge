import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import API from '../api/axiosInstance';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Input, Button, TextArea, Select } from '../components';
import '../styles/CreateCourse.css';

const CreateCourse = () => {
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  // Redirect if not authenticated
  React.useEffect(() => {
    if (!isAuthenticated) {
      toast.error('You must be logged in to create a course');
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  const validationSchema = Yup.object({
    title: Yup.string().required('Title is required'),
    description: Yup.string().required('Description is required'),
    price: Yup.number().required('Price is required').positive('Price must be positive'),
    category: Yup.string().required('Category is required'),
    thumbnail: Yup.string().url('Must be a valid URL').required('Thumbnail URL is required'),
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  const categoryOptions = [
    { value: 'Web Development', label: 'Web Development' },
    { value: 'Mobile Development', label: 'Mobile Development' },
    { value: 'Data Science', label: 'Data Science' },
    { value: 'Machine Learning', label: 'Machine Learning' },
    { value: 'DevOps', label: 'DevOps' },
    { value: 'Design', label: 'Design' },
    { value: 'Business', label: 'Business' },
    { value: 'Marketing', label: 'Marketing' },
    { value: 'Other', label: 'Other' },
  ];

  return (
    <div className="container create-course-container">
      <div className="create-course-header">
        <motion.h1
          className="create-course-title"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Create New Course
        </motion.h1>
        <motion.p
          className="create-course-subtitle"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Share your knowledge with the world
        </motion.p>
      </div>

      <motion.div
        className="create-course-card card"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <Formik
          initialValues={{
            title: '',
            description: '',
            price: '',
            category: 'Web Development',
            thumbnail: ''
          }}
          validationSchema={validationSchema}
          onSubmit={async (values, { resetForm, setSubmitting }) => {
            const fallbackUserId = '665a9d1234567890abc12345';

            const payload = {
              ...values,
              price: Number(values.price),
              createdBy: user?._id || fallbackUserId,
            };

            try {
              await API.post('/courses', payload);
              toast.success('Course created successfully!');
              resetForm();
              navigate('/courses');
            } catch (error) {
              console.error('Error:', error.response?.data || error.message);
              toast.error(error.response?.data?.message || 'Failed to create course');
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ isSubmitting, errors, touched, handleChange, handleBlur, values }) => (
            <Form className="create-course-form">
              <div className="form-section">
                <h3 className="form-section-title">Course Information</h3>
                <motion.div variants={itemVariants}>
                  <Input
                    id="title"
                    name="title"
                    label="Course Title"
                    placeholder="e.g. Complete React Developer Course"
                    value={values.title}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.title}
                    touched={touched.title}
                    required
                  />
                </motion.div>

                <motion.div variants={itemVariants}>
                  <TextArea
                    id="description"
                    name="description"
                    label="Course Description"
                    placeholder="Describe what students will learn in this course"
                    value={values.description}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.description}
                    touched={touched.description}
                    rows={5}
                    required
                  />
                </motion.div>
              </div>

              <div className="form-section">
                <h3 className="form-section-title">Course Details</h3>
                <div className="form-row">
                  <motion.div variants={itemVariants}>
                    <Input
                      id="price"
                      name="price"
                      type="number"
                      label="Price (₹)"
                      placeholder="e.g. 499"
                      value={values.price}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={errors.price}
                      touched={touched.price}
                      required
                    />
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <Select
                      id="category"
                      name="category"
                      label="Category"
                      options={categoryOptions}
                      value={values.category}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={errors.category}
                      touched={touched.category}
                      required
                    />
                  </motion.div>
                </div>
              </div>

              <div className="form-section">
                <h3 className="form-section-title">Course Thumbnail</h3>
                <motion.div variants={itemVariants}>
                  <Input
                    id="thumbnail"
                    name="thumbnail"
                    label="Thumbnail URL"
                    placeholder="https://example.com/image.jpg"
                    value={values.thumbnail}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.thumbnail}
                    touched={touched.thumbnail}
                    required
                  />
                  {values.thumbnail && !errors.thumbnail && (
                    <div className="thumbnail-preview">
                      <img
                        src={values.thumbnail}
                        alt="Thumbnail preview"
                        onError={(e) => {
                          e.target.src = "https://placehold.co/600x400?text=Invalid+Image+URL";
                        }}
                      />
                    </div>
                  )}
                </motion.div>
              </div>

              <motion.div variants={itemVariants} className="form-actions">
                <Button
                  type="button"
                  variant="secondary"
                  disabled={isSubmitting}
                  onClick={() => navigate('/courses')}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Creating Course...' : 'Create Course'}
                </Button>
              </motion.div>
            </Form>
          )}
        </Formik>
      </motion.div>
    </div>
  );
};

export default CreateCourse;
