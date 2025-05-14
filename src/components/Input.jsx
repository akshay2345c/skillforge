import React from 'react';
import { motion } from 'framer-motion';

const Input = ({
  id,
  name,
  type = 'text',
  label,
  placeholder,
  value,
  onChange,
  onBlur,
  error,
  touched,
  required = false,
  className = '',
  ...props
}) => {
  return (
    <div className="form-group">
      {label && (
        <label htmlFor={id} className="form-label">
          {label} {required && <span className="form-required">*</span>}
        </label>
      )}
      <motion.input
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        className={`form-input ${error && touched ? 'error' : ''} ${className}`}
        whileFocus={{ scale: 1.01 }}
        required={required}
        {...props}
      />
      {error && touched && (
        <motion.div 
          className="form-error"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          {error}
        </motion.div>
      )}
    </div>
  );
};

export default Input;
