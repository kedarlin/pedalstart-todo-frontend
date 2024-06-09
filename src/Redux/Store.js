import { configureStore } from '@reduxjs/toolkit';
import sidebarReducer from './SidebarSlice.js';
import tasksReducer from './TaskSlice.js';
export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    sidebar: sidebarReducer,
  },
});