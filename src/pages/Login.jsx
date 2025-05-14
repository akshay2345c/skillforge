import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import API from '../api/axiosInstance';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../redux/authSlice';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email format').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  });

  return (
    <div>
      <h1>Login</h1>

      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={validationSchema}
        onSubmit={async (values, { resetForm }) => {
          try {
            const res = await API.post('/auth/login', values);

            // ✅ Dispatch loginSuccess
            dispatch(loginSuccess({
              user: res.data.user,
              token: res.data.token,
            }));

            toast.success('Login successful!');
            resetForm();
            navigate('/profile');
          } catch (error) {
            toast.error(error.response?.data?.message || 'Login failed');
          }
        }}
      >
        <Form>
          <label htmlFor="email">Email</label>
          <Field id="email" name="email" type="email" placeholder="you@example.com" />
          <ErrorMessage name="email" component="div" className="error" />

          <label htmlFor="password">Password</label>
          <Field id="password" name="password" type="password" placeholder="******" />
          <ErrorMessage name="password" component="div" className="error" />

          <button type="submit">Login</button>
        </Form>
      </Formik>
    </div>
  );
};

export default Login;
