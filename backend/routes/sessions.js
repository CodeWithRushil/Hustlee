const express = require('express');
const router = express.Router();
const Session = require('../models/Session');
const auth = require('../middleware/auth');

// Get all sessions for a mentor
router.get('/mentor', auth, async (req, res) => {
  try {
    const sessions = await Session.find({ mentor: req.user.id })
      .populate('student', 'name email avatar')
      .sort({ startTime: 1 });
    res.json(sessions);
  } catch (error) {
    console.error('Error fetching mentor sessions:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all sessions for a student
router.get('/student', auth, async (req, res) => {
  try {
    const sessions = await Session.find({ student: req.user.id })
      .populate('mentor', 'name email avatar')
      .sort({ startTime: 1 });
    res.json(sessions);
  } catch (error) {
    console.error('Error fetching student sessions:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create a new session
router.post('/', auth, async (req, res) => {
  try {
    const {
      student,
      title,
      description,
      startTime,
      endTime,
      duration,
      type,
      category,
      priority,
      link,
      notes,
      agenda,
      reminder
    } = req.body;

    // Validate time slots
    const existingSession = await Session.findOne({
      mentor: req.user.id,
      startTime: { $lt: endTime },
      endTime: { $gt: startTime },
      status: { $ne: 'cancelled' }
    });

    if (existingSession) {
      return res.status(400).json({ message: 'Time slot conflicts with existing session' });
    }

    const session = new Session({
      mentor: req.user.id,
      student,
      title,
      description,
      startTime,
      endTime,
      duration,
      type,
      category,
      priority,
      link,
      notes,
      agenda,
      reminder
    });

    await session.save();
    res.status(201).json(session);
  } catch (error) {
    console.error('Error creating session:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update a session
router.put('/:id', auth, async (req, res) => {
  try {
    const session = await Session.findById(req.params.id);
    if (!session) {
      return res.status(404).json({ message: 'Session not found' });
    }

    // Check if user is the mentor
    if (session.mentor.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const updates = req.body;
    delete updates.mentor; // Prevent changing mentor
    delete updates.student; // Prevent changing student

    // If updating time, check for conflicts
    if (updates.startTime || updates.endTime) {
      const startTime = updates.startTime || session.startTime;
      const endTime = updates.endTime || session.endTime;

      const existingSession = await Session.findOne({
        _id: { $ne: session._id },
        mentor: req.user.id,
        startTime: { $lt: endTime },
        endTime: { $gt: startTime },
        status: { $ne: 'cancelled' }
      });

      if (existingSession) {
        return res.status(400).json({ message: 'Time slot conflicts with existing session' });
      }
    }

    Object.assign(session, updates);
    await session.save();
    res.json(session);
  } catch (error) {
    console.error('Error updating session:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete a session
router.delete('/:id', auth, async (req, res) => {
  try {
    const session = await Session.findById(req.params.id);
    if (!session) {
      return res.status(404).json({ message: 'Session not found' });
    }

    // Check if user is the mentor
    if (session.mentor.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    await session.remove();
    res.json({ message: 'Session deleted successfully' });
  } catch (error) {
    console.error('Error deleting session:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Add feedback to a session
router.post('/:id/feedback', auth, async (req, res) => {
  try {
    const session = await Session.findById(req.params.id);
    if (!session) {
      return res.status(404).json({ message: 'Session not found' });
    }

    // Check if user is the student
    if (session.student.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const { rating, comment } = req.body;
    session.feedback = {
      rating,
      comment,
      date: new Date()
    };

    await session.save();
    res.json(session);
  } catch (error) {
    console.error('Error adding feedback:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 