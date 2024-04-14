import { createSlice } from '@reduxjs/toolkit';

const todosSlice = createSlice({
  name: 'todos',
  initialState: [],
  reducers: {
    addTodo: (state, action) => {
      state.push({ id: state.length, text: action.payload, completed: false, createdAt: Date.now(), updatedAt: Date.now(), completedAt: "NA" });
    },
    loadTodos: (state, action) => {
      return action.payload;
    },
    toggleTodo: (state, action) => {
      const todo = state.find(todo => todo.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
        todo.updatedAt = Date.now();
        if (todo.completed) todo.completedAt = Date.now();
      }
    },
    editTodo: (state, action) => {
      const { id, newText } = action.payload;
      const todo = state.find(todo => todo.id === id);
      if (todo) {
        todo.text = newText;
        todo.updatedAt = Date.now();
      }
    },
    deleteTodo: (state, action) => {
      return state.filter(todo => todo.id !== action.payload);
    },
  },
});

export const { addTodo, loadTodos, toggleTodo, editTodo, deleteTodo } = todosSlice.actions;

export default todosSlice.reducer;
