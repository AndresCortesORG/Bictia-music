const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.set('useCreateIndex', true);
const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    trim: true
  },
  avatar_url: {
    type: String,
  }
}, {
    timestamps: true
  });

module.exports = userSchema;
