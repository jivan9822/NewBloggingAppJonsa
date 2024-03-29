const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// NESTED SCHEMA TO RECORD USERS VOTES
const actionSchema = mongoose.Schema({
  like: {
    type: [mongoose.Types.ObjectId],
    default: [],
  },
  mindBlowing: {
    type: [mongoose.Types.ObjectId],
    default: [],
  },
  disLike: {
    type: [mongoose.Types.ObjectId],
    default: [],
  },
});

// MAIN SCHEMA
const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Please provide user name!'],
    unique: true,
  },
  email: {
    type: String,
    required: [true, 'Please provide a email'],
    match: [
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      'Please enter a valid email id!',
    ],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    select: false,
    match: [
      /^.{5,15}$/,
      'password should be min length is 8 and max length is 15',
    ],
  },
  // NESTED ACTION SCHEMA
  action: {
    type: actionSchema,
    required: true,
    default: {
      like: [],
      mindBlowing: [],
      disLike: [],
    },
  },
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.methods.comparePass = async function (userPass, dbPass) {
  return await bcrypt.compare(userPass, dbPass);
};

const User = mongoose.model('User', userSchema);
module.exports = User;
