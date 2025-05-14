import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup'; // ✅ Yup for validation

const Login = () => {
  // ✅ Define Yup validation schema
  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Invalid email format')
      .required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
  });

  return (
    <div>
      <h1>Login</h1>

      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        validationSchema={validationSchema} // ✅ Add validation schema here
        onSubmit={async (values) => {
          await new Promise((r) => setTimeout(r, 500));
          alert(JSON.stringify(values, null, 2));
        }}
      >
        <Form>
          <label htmlFor="email">Email</label>
          <Field
            id="email"
            name="email"
            placeholder="jane@acme.com"
            type="email"
          />
          {/* ✅ Show email error */}
          <ErrorMessage name="email" component="div" className="error" />

          <label htmlFor="password">Password</label>
          <Field
            id="password"
            name="password"
            placeholder="******"
            type="password"
          />
          {/* ✅ Show password error */}
          <ErrorMessage name="password" component="div" className="error" />

          <button type="submit">Submit</button>
        </Form>
      </Formik>
    </div>
  );
};

export default Login;
