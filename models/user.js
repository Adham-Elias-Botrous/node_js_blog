const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    lowercase: true,
    required: [true, "Name can't be blank"],
    index: true
  },
  email: {
    type: String,
    lowercase: true,
    unique: [true, 'Not valid to use'],
    required: [true, "email can't be blank"],
    match: [/\S+@\S+\.\S+/, 'is invalid'],
    index: true
  },

  password: {
    type: String,
    required: [true, "password can't be blank"]
  },
  created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', UserSchema);
