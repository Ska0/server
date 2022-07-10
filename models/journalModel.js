const mongoose = require('mongoose');

const journalSchema = mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a title']
  },
  content: {
    type: Array,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
},
  {
    timestamps: true
  })

  module.exports = mongoose.model('Journal', journalSchema);
