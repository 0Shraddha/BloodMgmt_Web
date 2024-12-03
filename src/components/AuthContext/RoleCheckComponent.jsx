import React from 'react';
import { useAuth } from './AuthContext';

const RoleCheckComponent = () => {
  const { role, fullname } = useAuth();

  if (!role) {
    return <p>No role found. Please log in or update your account details.</p>;
  }

  return (
    <div>
      <h1>Welcome, {fullname}!</h1>
      <p>Your role is: {role}</p>
      {role === 'admin' && <button>Admin Panel</button>}
    </div>
  );
};

export default RoleCheckComponent;
