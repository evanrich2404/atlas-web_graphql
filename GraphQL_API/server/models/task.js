const mongoose = require('mongoose');

const { Schema } = mongoose;

const taskSchema = new Schema({
  projectId: String,
  title: String,
  weight: Number,
  description: String,
});

module.exports = mongoose.model('Task', taskSchema);
