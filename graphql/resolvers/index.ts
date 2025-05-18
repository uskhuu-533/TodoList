/* eslint-disable @typescript-eslint/no-explicit-any */
import { Todo } from '@/models/todo';

export const resolvers = {
  Query: {
    todos: async () => await Todo.find(),
  },
  Mutation: {
    addTodo: async (_: any, { title }: { title: string }) => {
      const newTodo = new Todo({ title, completed: false });
      return await newTodo.save();
    },
    toggleTodo: async (_: any, { id }: { id: string }) => {
      const todo = await Todo.findById(id);
      todo.completed = !todo.completed;
      return await todo.save();
    },
    deleteTodo: async (_: any, { id }: { id: string }) => {
      await Todo.findByIdAndDelete(id);
      return true;
    },
  },
};
