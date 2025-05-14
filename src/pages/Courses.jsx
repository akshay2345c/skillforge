import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCourses } from '../redux/courseSlice';
import { motion } from 'framer-motion';
import { Card } from '../components';
import '../styles/Courses.css';

const Courses = () => {
  const dispatch = useDispatch();
  const { data: courses, loading, error } = useSelector((state) => state.courses);

  useEffect(() => {
    dispatch(fetchCourses());
  }, [dispatch]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const courseVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  // Placeholder image if thumbnail is missing
  const placeholderImage = "https://images.unsplash.com/photo-1501504905252-473c47e087f8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80";

  return (
    <div className="container courses-container">
      <div className="courses-header">
        <h1 className="courses-title">Explore Courses</h1>
        <p className="courses-subtitle">Discover skills to advance your career</p>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="courses-loading">
          <motion.div
            animate={{
              rotate: 360
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: "linear"
            }}
            className="loading-spinner"
          />
        </div>
      )}

      {/* Error State */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="courses-error"
        >
          <p>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            {error}
          </p>
        </motion.div>
      )}

      {/* Empty State */}
      {courses.length === 0 && !loading && !error && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="courses-empty"
        >
          <div className="empty-icon">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <h2 className="empty-title">No courses available yet</h2>
          <p className="empty-text">Check back later or be the first to create a course!</p>
        </motion.div>
      )}

      {/* Course Grid */}
      {!loading && courses.length > 0 && (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="courses-grid"
        >
          {courses.map((course) => (
            <motion.div key={course._id} variants={courseVariants}>
              <Card className="course-card">
                <div className="course-image-container">
                  <img
                    src={course.thumbnail || placeholderImage}
                    alt={course.title}
                    className="course-image"
                    onError={(e) => {
                      e.target.src = placeholderImage;
                    }}
                  />
                </div>
                <div className="course-content">
                  <div className="course-meta">
                    <span className="course-category">
                      {course.category || 'General'}
                    </span>
                    <span className="course-price">₹{course.price}</span>
                  </div>
                  <h3 className="course-title">{course.title}</h3>
                  <p className="course-description">{course.description}</p>
                  <div className="course-footer">
                    <span className="course-author">
                      By: {course.createdBy?.name || 'Unknown'}
                    </span>
                    <a href="#" className="course-action">
                      View Details
                    </a>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default Courses;
