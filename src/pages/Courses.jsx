import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCourses } from '../redux/courseSlice';

const Courses = () => {
  const dispatch = useDispatch();
  const { data: courses, loading, error } = useSelector((state) => state.courses);

  useEffect(() => {
    dispatch(fetchCourses());
  }, [dispatch]);

  return (
    <div style={{ padding: '1rem' }}>
      <h2>📚 All Courses</h2>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>❌ {error}</p>}

      {courses.length === 0 && !loading && <p>No courses found.</p>}

      <ul>
        {courses.map((course) => (
          <li key={course._id} style={{ marginBottom: '1rem' }}>
            <h3>{course.title}</h3>
            <p>{course.description}</p>
            <p><strong>₹{course.price}</strong> | {course.category}</p>
            {course.thumbnail && (
              <img src={course.thumbnail} alt="Thumbnail" width="200" />
            )}
            <p><small>By: {course.createdBy?.name || 'Unknown'}</small></p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Courses;
