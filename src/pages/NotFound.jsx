import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Container, Button } from '../components/ui';

const NotFound = () => {
  return (
    <Container className="py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-lg mx-auto"
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <img
            src="https://img.icons8.com/fluency/240/000000/error.png"
            alt="404 Error"
            className="w-32 h-32 mx-auto mb-6"
          />
        </motion.div>

        <h1 className="text-4xl font-bold text-gray-800 mb-4">Page Not Found</h1>
        <p className="text-gray-600 mb-8">
          The page you are looking for doesn't exist or has been moved.
        </p>

        <div className="flex justify-center space-x-4">
          <Link to="/">
            <Button variant="primary">
              Go Home
            </Button>
          </Link>
          <Link to="/courses">
            <Button variant="outline">
              Browse Courses
            </Button>
          </Link>
        </div>
      </motion.div>
    </Container>
  );
};

export default NotFound;