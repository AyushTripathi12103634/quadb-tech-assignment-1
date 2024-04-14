import { configureStore } from '@reduxjs/toolkit';
import todosReducer from './slice';

export default configureStore({
  reducer: {
    todos: todosReducer,
  },
});
