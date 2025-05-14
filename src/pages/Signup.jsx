import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import API from '../api/axiosInstance';
import { toast } from 'react-toastify';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Input, Button } from '../components';
import '../styles/Auth.css';

const Signup = () => {
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password')], 'Passwords must match')
      .required('Please confirm your password'),
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

  return (
    <div className="auth-container">
      <motion.div
        className="auth-card auth-animate"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="auth-header">
          <motion.h1 className="auth-title" variants={itemVariants}>Create Your Account</motion.h1>
          <motion.p className="auth-subtitle" variants={itemVariants}>Join SkillForge and start learning today</motion.p>
        </div>

        <Formik
          initialValues={{
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
          }}
          validationSchema={validationSchema}
          onSubmit={async (values, { resetForm, setSubmitting }) => {
            try {
              // Submit to backend
              await API.post('/auth/signup', values);
              toast.success('Signup successful! Please login.');
              resetForm();
              navigate('/login');
            } catch (error) {
              toast.error(error.response?.data?.message || 'Signup failed');
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ isSubmitting, errors, touched, handleChange, handleBlur, values }) => (
            <Form className="auth-form">
              <motion.div className="auth-form-group auth-animate auth-animate-delay-1" variants={itemVariants}>
                <Input
                  id="name"
                  name="name"
                  label="Full Name"
                  placeholder="John Doe"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.name}
                  touched={touched.name}
                  required
                />
              </motion.div>

              <motion.div className="auth-form-group auth-animate auth-animate-delay-1" variants={itemVariants}>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  label="Email Address"
                  placeholder="you@example.com"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.email}
                  touched={touched.email}
                  required
                />
              </motion.div>

              <motion.div className="auth-form-group auth-animate auth-animate-delay-2" variants={itemVariants}>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  label="Password"
                  placeholder="••••••"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.password}
                  touched={touched.password}
                  required
                />
              </motion.div>

              <motion.div className="auth-form-group auth-animate auth-animate-delay-2" variants={itemVariants}>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  label="Confirm Password"
                  placeholder="••••••"
                  value={values.confirmPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.confirmPassword}
                  touched={touched.confirmPassword}
                  required
                />
              </motion.div>

              <motion.div className="auth-button auth-animate auth-animate-delay-3" variants={itemVariants}>
                <Button
                  type="submit"
                  variant="primary"
                  fullWidth
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Creating Account...' : 'Sign Up'}
                </Button>
              </motion.div>
            </Form>
          )}
        </Formik>

        <motion.div className="auth-footer" variants={itemVariants}>
          <p>
            Already have an account?{' '}
            <Link to="/login" className="auth-link">
              Log in
            </Link>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Signup;
