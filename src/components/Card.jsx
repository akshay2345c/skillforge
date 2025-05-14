import React from 'react';
import { motion } from 'framer-motion';

const Card = ({ 
  children, 
  hover = false,
  className = '', 
  ...props 
}) => {
  return (
    <motion.div
      className={`card ${className}`}
      whileHover={hover ? { y: -5 } : {}}
      transition={{ type: 'spring', stiffness: 300 }}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export const CardHeader = ({ children, className = '', ...props }) => {
  return (
    <div className={`card-header ${className}`} {...props}>
      {children}
    </div>
  );
};

export const CardBody = ({ children, className = '', ...props }) => {
  return (
    <div className={`card-body ${className}`} {...props}>
      {children}
    </div>
  );
};

export const CardFooter = ({ children, className = '', ...props }) => {
  return (
    <div className={`card-footer ${className}`} {...props}>
      {children}
    </div>
  );
};

export const CardImage = ({ src, alt, className = '', ...props }) => {
  return (
    <div className="card-image-container">
      <img 
        src={src} 
        alt={alt} 
        className={`card-image ${className}`}
        onError={(e) => {
          e.target.src = "https://placehold.co/600x400?text=Image+Not+Found";
        }}
        {...props}
      />
    </div>
  );
};

export default Card;
