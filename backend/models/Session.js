const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
  mentor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: String,
  startTime: {
    type: Date,
    required: true
  },
  endTime: {
    type: Date,
    required: true
  },
  duration: {
    type: Number, // in minutes
    required: true
  },
  type: {
    type: String,
    enum: ['video', 'voice', 'text'],
    default: 'video'
  },
  status: {
    type: String,
    enum: ['scheduled', 'in-progress', 'completed', 'cancelled'],
    default: 'scheduled'
  },
  category: {
    type: String,
    enum: ['meeting', 'workshop', 'consultation', 'review'],
    default: 'meeting'
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium'
  },
  link: String, // For video/voice sessions
  notes: String,
  agenda: [String],
  feedback: {
    rating: Number,
    comment: String,
    date: Date
  },
  reminder: {
    enabled: {
      type: Boolean,
      default: false
    },
    time: Date
  },
  attachments: [{
    name: String,
    url: String,
    type: String
  }]
}, {
  timestamps: true
});

// Index for efficient querying
sessionSchema.index({ mentor: 1, startTime: 1 });
sessionSchema.index({ student: 1, startTime: 1 });
sessionSchema.index({ status: 1 });

module.exports = mongoose.model('Session', sessionSchema); 