const mongoose = require('mongoose');

const { Schema } = mongoose;

const projectSchema = new Schema({
  title: String,
  weight: Number,
  description: String,
});

module.exports = mongoose.model('Project', projectSchema);
