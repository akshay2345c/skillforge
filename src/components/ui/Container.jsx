import React from 'react';

const Container = ({ 
  children, 
  className = '',
  ...props 
}) => {
  return (
    <div className={`container-custom ${className}`} {...props}>
      {children}
    </div>
  );
};

export default Container;
