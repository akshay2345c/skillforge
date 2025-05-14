import React from 'react';
import { useSelector } from 'react-redux';

const Profile = () => {
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  if (!isAuthenticated) {
    return <p style={{ padding: '1rem' }}>You are not logged in.</p>;
  }

  return (
    <div style={{ padding: '1rem' }}>
      <h2>👤 Profile</h2>
      <p><strong>Name:</strong> {user?.name}</p>
      <p><strong>Email:</strong> {user?.email}</p>
    </div>
  );
};

export default Profile;

