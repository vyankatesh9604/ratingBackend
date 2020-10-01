const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
      type: String,
      required: [true, 'Please tell us your name!']
    },
    email: {
      type: String,
      required: [true, 'Please provide your email'],
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, 'Please provide a password'],
      minlength: 8,
    },
    rating:[{
      companyname: {
        type: String,
        required: [true, 'Please tell us your company name!']
      },
      training: {
        type: Number,
        required: [true, 'Please provide your training rating'],
      },
      environment: {
        type: Number,
        required: [true, 'Please provide your environment rating '],
      },
      epf: {
          type: String,
          required: [true, 'Please provide a EPF Benifit'],
      },
      health: {
          type: Number,
          required: [true, 'Please provide your rating for healt consiousness'],
      },
      teamsprit: {
          type: Number,
          required: [true, 'Please provide your rating team sprit'],
      },
      policies: {
          type: Number,
          required: [true, 'Please provide your rating environmental policies'],
      },
  }]
})

const User = mongoose.model('User', userSchema);

module.exports = User;