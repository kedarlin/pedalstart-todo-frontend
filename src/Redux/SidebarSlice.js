import { createSlice } from '@reduxjs/toolkit';

export const sidebarSlice = createSlice({
  name: 'sidebar',
  initialState: {
    selectedItem: 'Today',
    isSidebarOpen: false,
  },
  reducers: {
    selectItem: (state, action) => {
      state.selectedItem = action.payload;
    },
    toggleSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
  },
});

export const { selectItem, toggleSidebar } = sidebarSlice.actions;
export const selectSidebarOpen = state => state.sidebar.isSidebarOpen;
export default sidebarSlice.reducer;