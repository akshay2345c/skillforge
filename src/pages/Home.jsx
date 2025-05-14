import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCourses } from '../redux/courseSlice';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button, Card } from '../components';
import '../styles/Home.css';

const Home = () => {
  const dispatch = useDispatch();
  const { data: courses, loading } = useSelector((state) => state.courses);
  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchCourses());
  }, [dispatch]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
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

  // Get featured courses (first 3)
  const featuredCourses = courses.slice(0, 3);

  // Placeholder image if thumbnail is missing
  const placeholderImage = "https://images.unsplash.com/photo-1501504905252-473c47e087f8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-background">
          <img
            src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
            alt="Students learning"
            className="hero-image"
          />
          <div className="hero-overlay">
            <motion.div
              className="hero-content"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="hero-title">Unlock Your Potential with SkillForge</h1>
              <p className="hero-subtitle">
                Learn from industry experts and master new skills at your own pace.
                Join thousands of students already learning on our platform.
              </p>
              <div className="hero-buttons">
                <Button
                  variant="primary"
                  size="lg"
                  onClick={() => window.scrollTo({
                    top: document.getElementById('featured-courses').offsetTop - 100,
                    behavior: 'smooth'
                  })}
                >
                  Start Learning Today
                </Button>
                {!isAuthenticated && (
                  <Link to="/courses">
                    <Button variant="secondary" size="lg">
                      Browse Courses
                    </Button>
                  </Link>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Courses Section */}
      <section id="featured-courses" className="featured-courses-section">
        <div className="container">
          <div className="featured-courses-header">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="featured-courses-title">Featured Courses</h2>
              <p className="featured-courses-subtitle">Explore our most popular courses</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <Link to="/courses">
                <Button variant="outline">View All Courses</Button>
              </Link>
            </motion.div>
          </div>

          {loading ? (
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
          ) : featuredCourses.length > 0 ? (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="featured-courses-grid"
            >
              {featuredCourses.map((course) => (
                <motion.div key={course._id} variants={itemVariants}>
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
                        <Button variant="outline" size="sm">
                          View More Details
                        </Button>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <div className="text-center py-12">
              <p>No courses available yet. Check back soon!</p>
            </div>
          )}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="benefits-section">
        <div className="container">
          <div className="section-header">
            <motion.h2
              className="section-title"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              Why Choose SkillForge?
            </motion.h2>
            <motion.p
              className="section-subtitle"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              Our platform is designed to provide the best learning experience with expert instructors and comprehensive courses.
            </motion.p>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="benefits-grid"
          >
            {[
              {
                icon: "https://img.icons8.com/fluency/96/000000/video.png",
                title: "Learn from Experts",
                description: "Learn from industry professionals with real-world experience and practical insights."
              },
              {
                icon: "https://img.icons8.com/fluency/96/000000/certificate.png",
                title: "Earn Certificates",
                description: "Showcase your skills with certificates upon completion of courses."
              },
              {
                icon: "https://img.icons8.com/fluency/96/000000/clock.png",
                title: "Flexible Access",
                description: "Access course content anytime, anywhere, and learn at a pace that suits you."
              }
            ].map((benefit, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Card className="benefit-card">
                  <img src={benefit.icon} alt={benefit.title} className="benefit-icon" />
                  <h3 className="benefit-title">{benefit.title}</h3>
                  <p className="benefit-description">{benefit.description}</p>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div>
              <div className="footer-logo">
                <img
                  src="https://img.icons8.com/fluency/48/000000/graduation-cap.png"
                  alt="SkillForge Logo"
                  className="footer-logo-img"
                />
                <span className="footer-logo-text">SkillForge</span>
              </div>
              <p className="footer-description">
                SkillForge is a modern learning platform designed to help you master new skills and advance your career.
              </p>
              <div className="footer-social">
                <a href="#" className="footer-social-link">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="#" className="footer-social-link">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="#" className="footer-social-link">
                  <i className="fab fa-instagram"></i>
                </a>
                <a href="#" className="footer-social-link">
                  <i className="fab fa-linkedin-in"></i>
                </a>
              </div>
            </div>
            <div>
              <h3 className="footer-title">Quick Links</h3>
              <div className="footer-links">
                <Link to="/" className="footer-link">Home</Link>
                <Link to="/courses" className="footer-link">Courses</Link>
                <Link to="/login" className="footer-link">Login</Link>
                <Link to="/signup" className="footer-link">Sign Up</Link>
              </div>
            </div>
            <div>
              <h3 className="footer-title">Contact Us</h3>
              <div className="footer-links">
                <a href="mailto:info@skillforge.com" className="footer-link">info@skillforge.com</a>
                <a href="tel:+1234567890" className="footer-link">+1 (234) 567-890</a>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; {new Date().getFullYear()} SkillForge. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </motion.div>
  );
};

export default Home;