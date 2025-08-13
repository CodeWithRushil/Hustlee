const mongoose = require('mongoose');

const mentorProfileSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  avatar: {
    type: String
  },
  bio: {
    type: String
  },
  expertise: [{
    skill: String,
    level: String
  }],
  experience: [{
    title: String,
    company: String,
    startDate: String,
    endDate: String,
    description: String
  }],
  education: [{
    degree: String,
    institution: String,
    startDate: String,
    endDate: String,
    description: String
  }],
  languages: [{
    language: String,
    proficiency: String
  }],
  certifications: [{
    name: String,
    issuer: String,
    date: String,
    description: String
  }],
  achievements: [{
    title: String,
    date: String,
    description: String
  }],
  socialLinks: {
    linkedin: String,
    github: String,
    twitter: String,
    website: String
  },
  preferences: {
    teachingStyle: String,
    availability: {
      monday: { start: String, end: String },
      tuesday: { start: String, end: String },
      wednesday: { start: String, end: String },
      thursday: { start: String, end: String },
      friday: { start: String, end: String },
      saturday: { start: String, end: String },
      sunday: { start: String, end: String }
    },
    sessionDuration: Number,
    maxStudentsPerSession: Number,
    preferredCommunication: String
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('MentorProfile', mentorProfileSchema); 