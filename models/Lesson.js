const mongoose = require('mongoose')

	const LessonSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  body: {
    type: String,
  },
  level: {
    type: String,
    default: '2bac',
	  enum: ['2bac', '1bac', 'tcs','3ac','2ac','1ac'],
  },
  status: {
    type: String,
    default: 'physique',
    enum: ['physique', 'chimie'],
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

module.exports = mongoose.model('Lesson', LessonSchema)
