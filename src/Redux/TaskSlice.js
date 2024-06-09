// tasksSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async (userId) => {
    const response = await axios.get(`http://localhost:3069/api/task/${userId}`);
    return response.data;
});

export const addTask = createAsyncThunk('tasks/addTask', async (taskData) => {
    const response = await axios.post('http://localhost:3069/api/task', taskData);
    return response.data;
});

export const updateTask = createAsyncThunk('tasks/updateTask', async ({ id, taskStatus }) => {
    const userId = localStorage.getItem('userId');
    const taskId = id;
    const response = await axios.put(`http://localhost:3069/api/task/${userId}/${taskId}`, { taskStatus });
    return response.data;
});

export const deleteTask = createAsyncThunk('tasks/deleteTask', async (taskId) => {
    const userId = localStorage.getItem('userId');
    await axios.delete(`http://localhost:3069/api/task/${userId}/${taskId}`);
    return taskId;
});

const tasksSlice = createSlice({
    name: 'tasks',
    initialState: {
        items: [],
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTasks.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchTasks.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload;
            })
            .addCase(fetchTasks.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(addTask.fulfilled, (state, action) => {
                state.items.push(action.payload);
            })
            .addCase(updateTask.fulfilled, (state, action) => {
                const updatedTask = action.payload;
                const index = state.items.findIndex(task => task._id === updatedTask._id);
                if (index !== -1) {
                    state.items[index] = updatedTask;
                }
            })
            .addCase(deleteTask.fulfilled, (state, action) => {
                const taskId = action.payload;
                state.items = state.items.filter(task => task._id !== taskId);
            });
    },
});

export default tasksSlice.reducer;