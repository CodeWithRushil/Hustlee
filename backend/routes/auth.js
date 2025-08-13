const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const auth = require('../middleware/auth');

// Register new user
router.post('/register', async (req, res) => {
  try {
    const { email, password, name, userType } = req.body;

    // Validate required fields
    const missingFields = [];
    if (!email) missingFields.push('Email');
    if (!password) missingFields.push('Password');
    if (!name) missingFields.push('Name');
    if (!userType) missingFields.push('User Type');

    if (missingFields.length > 0) {
      return res.status(400).json({ 
        message: 'Missing required fields',
        errors: missingFields.map(field => `${field} is required`)
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ 
        message: 'Invalid email format',
        errors: ['Please enter a valid email address (e.g., user@example.com)']
      });
    }

    // Validate password strength
    if (password.length < 6) {
      return res.status(400).json({ 
        message: 'Password is too weak',
        errors: ['Password must be at least 6 characters long']
      });
    }

    // Validate user type
    const validUserTypes = ['student', 'mentor', 'company', 'employee'];
    if (!validUserTypes.includes(userType)) {
      return res.status(400).json({ 
        message: 'Invalid user type',
        errors: [`User type must be one of: ${validUserTypes.join(', ')}`]
      });
    }

    // Validate user type specific fields
    const typeSpecificErrors = [];
    switch (userType) {
      case 'student':
        if (!req.body.education) {
          typeSpecificErrors.push('Education is required for students');
        }
        break;
      case 'mentor':
        if (!req.body.expertise || req.body.expertise.length === 0) {
          typeSpecificErrors.push('At least one expertise area is required for mentors');
        }
        if (!req.body.yearsOfExperience) {
          typeSpecificErrors.push('Years of experience is required for mentors');
        }
        if (!req.body.hourlyRate) {
          typeSpecificErrors.push('Hourly rate is required for mentors');
        }
        break;
      case 'company':
        if (!req.body.companyName) {
          typeSpecificErrors.push('Company name is required');
        }
        if (!req.body.industry) {
          typeSpecificErrors.push('Industry is required');
        }
        if (!req.body.size) {
          typeSpecificErrors.push('Company size is required');
        }
        break;
      case 'employee':
        if (!req.body.department) {
          typeSpecificErrors.push('Department is required for employees');
        }
        if (!req.body.role) {
          typeSpecificErrors.push('Role is required for employees');
        }
        break;
    }

    if (typeSpecificErrors.length > 0) {
      return res.status(400).json({
        message: 'Missing required fields for user type',
        errors: typeSpecificErrors
      });
    }

    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ 
        message: 'User already exists',
        errors: ['An account with this email already exists. Please use a different email or try logging in.']
      });
    }

    // Create new user
    user = new User({
      email,
      password,
      name,
      userType,
      ...req.body
    });

    await user.save();

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, userType: user.userType },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '7d' }
    );

    res.status(201).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        userType: user.userType,
        avatar: user.avatar
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    
    // Handle validation errors
    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ 
        message: 'Validation error',
        errors: validationErrors
      });
    }

    // Handle duplicate key error
    if (error.code === 11000) {
      return res.status(400).json({ 
        message: 'Email already exists',
        errors: ['An account with this email already exists. Please use a different email or try logging in.']
      });
    }

    res.status(500).json({ 
      message: 'Server error during registration',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Login user
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    // Validate required fields
    if (!email || !password) {
      return res.status(400).json({ 
        message: 'Email and password are required',
        required: ['email', 'password']
      });
    }

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Update last login
    user.lastLogin = new Date();
    await user.save();

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, userType: user.userType },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        userType: user.userType,
        avatar: user.avatar
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ 
      message: 'Server error during login',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Get current user
router.get('/me', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ user });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update user profile
router.put('/profile', auth, async (req, res) => {
  try {
    const updates = req.body;
    delete updates.password; // Prevent password update through this route

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { $set: updates },
      { new: true, runValidators: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ user });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ message: 'Server error during profile update' });
  }
});

// Update password
router.put('/password', auth, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({ 
        message: 'Current password and new password are required',
        required: ['currentPassword', 'newPassword']
      });
    }

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Verify current password
    const isMatch = await user.comparePassword(currentPassword);
    if (!isMatch) {
      return res.status(400).json({ message: 'Current password is incorrect' });
    }

    // Update password
    user.password = newPassword;
    await user.save();

    res.json({ message: 'Password updated successfully' });
  } catch (error) {
    console.error('Update password error:', error);
    res.status(500).json({ message: 'Server error during password update' });
  }
});

module.exports = router; 