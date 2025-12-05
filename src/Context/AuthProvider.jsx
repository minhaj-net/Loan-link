import React, { useState } from 'react';
import { AuthContext } from './AuthContext/AuthContext';

const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
   const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const authInfo = {
    user,
    loading,
    createUser,
    // signInUser,
    // handleGoogleSignIn,
    // logOut,
    // updateUserProfile,
  };
    if (loading) {
    <div>Loading.......</div>;
  }
  return <AuthContext value={authInfo}>{children}</AuthContext>;
};

export default AuthProvider;