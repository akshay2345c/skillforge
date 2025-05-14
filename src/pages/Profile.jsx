import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '../components';
import '../styles/Profile.css';

const Profile = () => {
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

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

  if (!isAuthenticated) {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="container profile-container">
      <div className="profile-header">
        <motion.h1
          className="profile-title"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          My Profile
        </motion.h1>
      </div>

      <div className="profile-grid">
        <motion.div
          className="profile-sidebar card"
          variants={itemVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="profile-avatar">
            {user?.name?.charAt(0).toUpperCase() || '?'}
          </div>
          <h2 className="profile-name">{user?.name}</h2>
          <p className="profile-email">{user?.email}</p>
          <div className="profile-action">
            <Button variant="outline" size="sm">
              Edit Profile
            </Button>
          </div>
        </motion.div>

        <div className="profile-main">
          <motion.div
            className="profile-section card"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <h3 className="profile-section-title">Account Information</h3>

            <motion.div className="profile-info-item" variants={itemVariants}>
              <p className="profile-info-label">Full Name</p>
              <p className="profile-info-value">{user?.name}</p>
            </motion.div>

            <motion.div className="profile-info-item" variants={itemVariants}>
              <p className="profile-info-label">Email Address</p>
              <p className="profile-info-value">{user?.email}</p>
            </motion.div>

            <motion.div className="profile-info-item" variants={itemVariants}>
              <p className="profile-info-label">Account Created</p>
              <p className="profile-info-value">
                {user?.createdAt
                  ? new Date(user.createdAt).toLocaleDateString()
                  : 'Not available'}
              </p>
            </motion.div>
          </motion.div>

          <motion.div
            className="profile-section card"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.2 }}
          >
            <h3 className="profile-section-title">My Activity</h3>
            <motion.div className="profile-activity" variants={itemVariants}>
              <p className="profile-activity-text">
                Start creating or enrolling in courses to see your activity here.
              </p>
              <Button
                variant="primary"
                size="sm"
                onClick={() => navigate('/create-course')}
              >
                Create a Course
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
