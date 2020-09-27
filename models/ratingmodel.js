const mongoose = require('mongoose');

const ratingSchema = new mongoose.Schema({
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
})

const Rating = mongoose.model('Rating', ratingSchema);

module.exports = Rating;