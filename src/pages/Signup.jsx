import React from 'react'
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
const Signup = () => {
  const validationSchema = Yup.object({
    name: Yup.string()
      .required('Name is required'),
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password')], 'Passwords must match')
      .required('Please confirm your password'),
  });
  return (
    <div>
      <h1>Signup</h1>

      <Formik
        initialValues={{
          name: '',
          email: '',
          password: '',
          confirmPassword: '',
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          alert(JSON.stringify(values, null, 2));
        }}
      >
        <Form>
          <label htmlFor="name">Full Name</label>
          <Field id="name" name="name" placeholder="Your full name" />
          <ErrorMessage name="name" component="div" className="error" />

          <label htmlFor="email">Email</label>
          <Field id="email" name="email" type="email" placeholder="example@email.com" />
          <ErrorMessage name="email" component="div" className="error" />

          <label htmlFor="password">Password</label>
          <Field id="password" name="password" type="password" placeholder="******" />
          <ErrorMessage name="password" component="div" className="error" />

          <label htmlFor="confirmPassword">Confirm Password</label>
          <Field id="confirmPassword" name="confirmPassword" type="password" placeholder="******" />
          <ErrorMessage name="confirmPassword" component="div" className="error" />

          <button type="submit">Sign Up</button>
        </Form>
      </Formik>
    </div>
  )
}

export default Signup