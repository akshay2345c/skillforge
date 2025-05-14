const mongoose = require('mongoose');
const Course = require('../models/Course');

// ✅ Create a new course
const createCourse = async (req, res) => {
  const { title, description, price, category, thumbnail, createdBy } = req.body;

  if (!title || !description || !price) {
    return res.status(400).json({ message: 'Title, description, and price are required.' });
  }

  try {
    const course = new Course({
      title,
      description,
      price,
      category,
      thumbnail,
      createdBy: createdBy ? new mongoose.Types.ObjectId(createdBy) : null,
    });

    const saved = await course.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create course', error: error.message });
  }
};

// ✅ Get all courses
const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find()
      .sort({ createdAt: -1 })
      .populate('createdBy', 'name'); // Optional: fetch user name who created

    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch courses', error: error.message });
  }
};

module.exports = {
  createCourse,
  getAllCourses,
};
