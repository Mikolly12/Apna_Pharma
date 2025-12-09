import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';

const LoginPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center">Login</h2>
        <form className="space-y-6">
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input type="email" className="w-full px-3 py-2 border rounded-md" />
          </div>
          <div>
            <label className="block text-sm font-medium">Password</label>
            <input type="password" className="w-full px-3 py-2 border rounded-md" />
          </div>
          <Button>Login</Button>
        </form>
        <p className="text-center">
          Don't have an account? <Link to="/signup" className="text-blue-600">Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
