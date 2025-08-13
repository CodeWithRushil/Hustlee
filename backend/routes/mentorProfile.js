const express = require('express');
const router = express.Router();
const MentorProfile = require('../models/MentorProfile');
const auth = require('../middleware/auth');

// Get mentor profile
router.get('/profile', auth, async (req, res) => {
  try {
    let profile = await MentorProfile.findOne({ userId: req.user.id });
    
    if (!profile) {
      // Create a new profile if it doesn't exist
      profile = new MentorProfile({
        userId: req.user.id,
        name: req.user.name,
        email: req.user.email,
        preferences: {
          availability: {
            monday: { start: '09:00', end: '17:00' },
            tuesday: { start: '09:00', end: '17:00' },
            wednesday: { start: '09:00', end: '17:00' },
            thursday: { start: '09:00', end: '17:00' },
            friday: { start: '09:00', end: '17:00' },
            saturday: { start: '10:00', end: '14:00' },
            sunday: { start: '10:00', end: '14:00' }
          },
          sessionDuration: 60,
          maxStudentsPerSession: 1,
          preferredCommunication: 'video'
        }
      });
      await profile.save();
    }
    
    res.json(profile);
  } catch (err) {
    console.error('Error in GET /profile:', err);
    res.status(500).json({ 
      message: 'Error fetching profile',
      error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
});

// Update mentor profile
router.put('/profile', auth, async (req, res) => {
  try {
    // Validate request body
    if (!req.body) {
      return res.status(400).json({ message: 'Request body is required' });
    }

    const profile = await MentorProfile.findOneAndUpdate(
      { userId: req.user.id },
      { $set: req.body },
      { 
        new: true, 
        upsert: true,
        runValidators: true
      }
    );

    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    res.json(profile);
  } catch (err) {
    console.error('Error in PUT /profile:', err);
    if (err.name === 'ValidationError') {
      return res.status(400).json({ 
        message: 'Validation error',
        errors: Object.values(err.errors).map(e => e.message)
      });
    }
    res.status(500).json({ 
      message: 'Error updating profile',
      error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
});

// Update avatar
router.put('/avatar', auth, async (req, res) => {
  try {
    if (!req.body.avatar) {
      return res.status(400).json({ message: 'Avatar URL is required' });
    }

    const profile = await MentorProfile.findOneAndUpdate(
      { userId: req.user.id },
      { $set: { avatar: req.body.avatar } },
      { new: true }
    );

    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    res.json(profile);
  } catch (err) {
    console.error('Error in PUT /avatar:', err);
    res.status(500).json({ 
      message: 'Error updating avatar',
      error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
});

module.exports = router; 