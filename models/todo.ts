import mongoose from 'mongoose';

const TodoSchema = new mongoose.Schema({
  title: String,
  completed: Boolean,
});

export const Todo = mongoose.models.Todo || mongoose.model('Todo', TodoSchema);
