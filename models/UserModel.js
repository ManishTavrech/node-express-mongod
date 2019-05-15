"use strict";
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  user_name: {
    type: String,
    trim: true
  },
  name: {
    type: String,
    trim: true
  },
  email_address: {
    type: String,
    unique: true,
    lowercase: true,
    index: true,
    trim: true,
    required: true
  },
  date_of_birth: Date,
  password: {
    type: String,
    trim: true,
    required: true
  },
  type: {
    type: String,
    default: 'User'
  },
  is_registered: Boolean,
  registration: {
    type: Date,
    default: Date.now
  },
  de_registration: {
    type: Date,
    default: ''
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: ''
  }
});

const user = mongoose.model('users', UserSchema);

module.exports = { user: user };