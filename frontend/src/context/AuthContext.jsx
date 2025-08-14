import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';


import { signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';
import { auth, googleProvider } from '../firebase'; 


const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const token = await firebaseUser.getIdToken();
        
        try {
          const response = await axios.get('https://hustlee-9d22.onrender.com/api/auth/me', {
            headers: { Authorization: `Bearer ${token}` }
          });
          setUser(response.data.user);
        } catch (error) {
          setUser(firebaseUser); 
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        const response = await axios.get('https://hustlee-9d22.onrender.com/api/auth/me', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUser(response.data.user);
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      localStorage.removeItem('token');
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      const response = await axios.post('https://hustlee-9d22.onrender.com/api/auth/login', {
        email,
        password
      });

      const { token, user } = response.data;

      if (!token || !user) throw new Error('Invalid response from server');

      localStorage.setItem('token', token);
      setUser(user);
      toast.success('Login successful!');

      if (user.userType === 'mentor') {
        navigate('/mentor/dashboard');
      } else {
        navigate('/dashboard');
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Login failed';
      toast.error(errorMessage);
      throw error;
    }
  };

  const register = async (userData) => {
    try {
      const response = await axios.post('https://hustlee-9d22.onrender.com/api/auth/register', userData);
      const { token, user } = response.data;

      if (!token || !user) throw new Error('Invalid response from server');

      localStorage.setItem('token', token);
      setUser(user);
      toast.success('Registration successful!');

      if (user.userType === 'mentor') {
        navigate('/mentor/dashboard');
      } else {
        navigate('/dashboard');
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Registration failed';
      toast.error(errorMessage);
      throw error;
    }
  };

  // Google login function implemented here

  const googleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const firebaseUser = result.user;
      const token = await firebaseUser.getIdToken();

      //Test: Send token to backend if needed
      try {
        const response = await axios.post('https://hustlee-9d22.onrender.com/api/auth/google', { token });
        setUser(response.data.user);
        toast.success('Google login successful!');

        if (response.data.user.userType === 'mentor') {
          navigate('/mentor/dashboard');
        } else {
          navigate('/dashboard');
        }
      } catch (err) {
       
        setUser(firebaseUser);
        toast.success('Google login successful (Firebase only)');
        navigate('/dashboard');
      }

    } catch (error) {
      console.error(error);
      toast.error('Google login failed');
    }
  };

  const logout = async () => {
    try {
      await signOut(auth); 
    } catch (err) {
      console.warn('Firebase sign out error', err);
    }
    localStorage.removeItem('token');
    setUser(null);
    navigate('/');
    toast.success('Logged out successfully');
  };

  const value = {
    user,
    loading,
    login,
    register,
    googleLogin,
    logout,
    checkAuth,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
