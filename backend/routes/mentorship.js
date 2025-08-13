const express = require('express');
const router = express.Router();
const Mentorship = require('../models/Mentorship');
const { auth, isStudent, isMentor } = require('../middleware/auth');

// Get all mentors
router.get('/mentors', auth, async (req, res) => {
  try {
    const mentors = await User.find({ 
      userType: 'mentor',
      'mentor.verification.isVerified': true,
      status: 'active'
    }).select('profile mentor.expertise mentor.yearsOfExperience mentor.hourlyRate mentor.rating');
    res.json(mentors);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get mentor's availability
router.get('/mentors/:mentorId/availability', auth, async (req, res) => {
  try {
    const mentor = await User.findById(req.params.mentorId);
    if (!mentor || mentor.userType !== 'mentor') {
      return res.status(404).json({ error: 'Mentor not found' });
    }
    res.json(mentor.mentor.availability);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Book a mentorship session
router.post('/book', auth, isStudent, async (req, res) => {
  try {
    const { mentorId, session } = req.body;
    
    // Check if mentor exists and is available
    const mentor = await User.findById(mentorId);
    if (!mentor || mentor.userType !== 'mentor') {
      return res.status(404).json({ error: 'Mentor not found' });
    }

    // Check if the requested time slot is available
    const isAvailable = mentor.mentor.availability.some(slot => {
      return slot.day === new Date(session.date).toLocaleDateString('en-US', { weekday: 'long' }) &&
             slot.slots.some(time => 
               time.start <= session.startTime && time.end >= session.endTime
             );
    });

    if (!isAvailable) {
      return res.status(400).json({ error: 'Selected time slot is not available' });
    }

    // Calculate session cost
    const durationInHours = session.duration / 60;
    const amount = mentor.mentor.hourlyRate * durationInHours;

    // Create mentorship session
    const mentorship = new Mentorship({
      mentor: mentorId,
      student: req.user._id,
      session,
      payment: {
        amount,
        currency: 'USD'
      }
    });

    await mentorship.save();

    res.status(201).json(mentorship);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get student's mentorship sessions
router.get('/student/sessions', auth, isStudent, async (req, res) => {
  try {
    const sessions = await Mentorship.find({ student: req.user._id })
      .populate('mentor', 'profile.name mentor.expertise')
      .sort({ 'session.date': 1 });
    res.json(sessions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get mentor's mentorship sessions
router.get('/mentor/sessions', auth, isMentor, async (req, res) => {
  try {
    const sessions = await Mentorship.find({ mentor: req.user._id })
      .populate('student', 'profile.name')
      .sort({ 'session.date': 1 });
    res.json(sessions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update session status
router.patch('/:id/status', auth, async (req, res) => {
  try {
    const { status } = req.body;
    const mentorship = await Mentorship.findById(req.params.id);
    
    if (!mentorship) {
      return res.status(404).json({ error: 'Session not found' });
    }

    // Check authorization
    if (req.user.userType === 'student' && mentorship.student.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: 'Not authorized' });
    }
    if (req.user.userType === 'mentor' && mentorship.mentor.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: 'Not authorized' });
    }

    mentorship.status = status;
    mentorship.updatedAt = Date.now();

    if (status === 'cancelled') {
      mentorship.cancellation = {
        reason: req.body.reason,
        cancelledBy: req.user._id,
        cancelledAt: new Date()
      };
    }

    await mentorship.save();
    res.json(mentorship);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
// Submit session feedback
router.post('/:id/feedback', auth, isStudent, async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const mentorship = await Mentorship.findById(req.params.id);
    
    if (!mentorship) {
      return res.status(404).json({ error: 'Session not found' });
    }

    if (mentorship.student.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: 'Not authorized' });
    }

    if (mentorship.status !== 'completed') {
      return res.status(400).json({ error: 'Session must be completed before submitting feedback' });
    }

    mentorship.feedback = {
      rating,
      comment,
      submittedAt: new Date()
    };

    // Update mentor's average rating
    const mentor = await User.findById(mentorship.mentor);
    const mentorSessions = await Mentorship.find({
      mentor: mentorship.mentor,
      'feedback.rating': { $exists: true }
    });

    const totalRating = mentorSessions.reduce((sum, session) => sum + session.feedback.rating, 0);
    mentor.mentor.rating = totalRating / mentorSessions.length;
    await mentor.save();

    await mentorship.save();
    res.json(mentorship);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router; 