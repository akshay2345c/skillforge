import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import API from '../api/axiosInstance';
import { toast } from 'react-toastify';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../redux/authSlice';
import { motion } from 'framer-motion';
import { Input, Button } from '../components';
import '../styles/Auth.css';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email format').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
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
          <motion.h1 className="auth-title" variants={itemVariants}>Welcome Back</motion.h1>
          <motion.p className="auth-subtitle" variants={itemVariants}>Sign in to continue to SkillForge</motion.p>
        </div>

        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={validationSchema}
          onSubmit={async (values, { resetForm, setSubmitting }) => {
            try {
              const res = await API.post('/auth/login', values);

              dispatch(loginSuccess({
                user: res.data.user,
                token: res.data.token,
              }));

              toast.success('Login successful!');
              resetForm();
              navigate('/profile');
            } catch (error) {
              toast.error(error.response?.data?.message || 'Login failed');
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ isSubmitting, errors, touched, handleChange, handleBlur, values }) => (
            <Form className="auth-form">
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

              <motion.div className="auth-button auth-animate auth-animate-delay-3" variants={itemVariants}>
                <Button
                  type="submit"
                  variant="primary"
                  fullWidth
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Logging in...' : 'Login'}
                </Button>
              </motion.div>
            </Form>
          )}
        </Formik>

        <motion.div className="auth-footer" variants={itemVariants}>
          <p>
            Don't have an account?{' '}
            <Link to="/signup" className="auth-link">
              Sign up
            </Link>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Login;
