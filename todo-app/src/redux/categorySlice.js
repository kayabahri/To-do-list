import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  categories: []
};

const categorySlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    addCategory: (state, action) => {
      state.categories.push({
        id: Date.now().toString(),
        name: action.payload,
        tasks: []
      });
    },
    addTask: (state, action) => {
      const { categoryId, task } = action.payload;
      const category = state.categories.find(cat => cat.id === categoryId);
      if (category) {
        category.tasks.push({
          id: Date.now().toString(),
          text: task
        });
      }
    },
    removeCategory: (state, action) => {
      state.categories = state.categories.filter(cat => cat.id !== action.payload);
    },
    removeTask: (state, action) => {
      const { categoryId, taskId } = action.payload;
      const category = state.categories.find(cat => cat.id === categoryId);
      if (category) {
        category.tasks = category.tasks.filter(task => task.id !== taskId);
      }
    }
  }
});

export const { addCategory, addTask, removeCategory, removeTask } = categorySlice.actions;

export default categorySlice.reducer;
