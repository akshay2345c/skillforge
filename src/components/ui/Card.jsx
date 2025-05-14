import React from 'react';
import { motion } from 'framer-motion';

const Card = ({ 
  children, 
  className = '', 
  hover = false,
  ...props 
}) => {
  return (
    <motion.div
      className={`card ${hover ? 'hover:shadow-lg transition-shadow duration-300' : ''} ${className}`}
      whileHover={hover ? { y: -5 } : {}}
      transition={{ type: 'spring', stiffness: 300 }}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default Card;
