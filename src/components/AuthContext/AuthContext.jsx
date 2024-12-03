import React, { createContext, useContext, useState, useEffect } from 'react';

// Create the context
const AuthContext = createContext();

// Provide context to the app
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({ fullname: '', role: '' });

  useEffect(() => {
    const userDetail = localStorage.getItem('userToken');
    if (userDetail) {
      const parsedUserDetail = JSON.parse(userDetail);
      setUser({
        fullname: `${parsedUserDetail.firstname} ${parsedUserDetail.lastname}`,
        role: parsedUserDetail.role,
      });
    }
  }, []);

  return (
    <AuthContext.Provider value={user}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
