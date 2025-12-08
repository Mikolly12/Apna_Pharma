import React from 'react';

const ProfilePage = () => {
  // This is a placeholder for the user profile page
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">My Profile</h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Order History</h2>
        <p>You have no previous orders.</p>
        {/* This is where order history would be mapped and displayed */}
      </div>
    </div>
  );
};

export default ProfilePage;
