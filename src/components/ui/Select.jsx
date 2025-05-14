import React from 'react';
import { motion } from 'framer-motion';

const Select = ({
  id,
  name,
  label,
  options = [],
  value,
  onChange,
  onBlur,
  error,
  touched,
  className = '',
  required = false,
  ...props
}) => {
  return (
    <div className="mb-4">
      {label && (
        <label htmlFor={id} className="form-label">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <motion.select
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        className={`input-field ${error && touched ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''} ${className}`}
        whileFocus={{ scale: 1.01 }}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </motion.select>
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

export default Select;
