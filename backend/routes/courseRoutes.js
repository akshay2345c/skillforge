const express = require('express');
const { createCourse, getAllCourses } = require('../controllers/courseController');

const router = express.Router();

router.post('/', createCourse);          // Create a new course
router.get('/', getAllCourses);          // ✅ Get all courses

module.exports = router;
