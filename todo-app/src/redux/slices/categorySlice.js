import { createSlice } from '@reduxjs/toolkit';
import {
  fetchCategories,
  addCategory,
  removeCategory,
  addTask,
  removeTask,
  moveTask,
  setTaskDates,
  updateTask,
  updateCategory,
} from '../thunks/categoryThunks';
import { archiveTask } from '../thunks/archiveThunks';

const categorySlice = createSlice({
  name: 'categories',
  initialState: {
    categories: [],
    status: 'idle',
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
      })
      .addCase(addCategory.fulfilled, (state, action) => {
        state.categories.push(action.payload);
      })
      .addCase(removeCategory.fulfilled, (state, action) => {
        state.categories = state.categories.filter(category => category.id !== action.payload);
      })
      .addCase(addTask.fulfilled, (state, action) => {
        const { categoryId, id, text } = action.payload;
        const category = state.categories.find(category => category.id === categoryId);
        if (category) {
          category.tasks.push({ id, text });
        }
      })
      .addCase(removeTask.fulfilled, (state, action) => {
        const { categoryId, taskId } = action.payload;
        const category = state.categories.find(category => category.id === categoryId);
        if (category) {
          category.tasks = category.tasks.filter(task => task.id !== taskId);
        }
      })
      .addCase(moveTask.fulfilled, (state, action) => {
        const { fromCategoryId, toCategoryId, taskId, position } = action.payload;
        const fromCategory = state.categories.find(category => category.id === fromCategoryId);
        const toCategory = state.categories.find(category => category.id === toCategoryId);
        if (fromCategory && toCategory) {
          const task = fromCategory.tasks.find(task => task.id === taskId);
          if (task) {
            fromCategory.tasks = fromCategory.tasks.filter(task => task.id !== taskId);
            toCategory.tasks.splice(position, 0, task);
          }
        }
      })
      .addCase(setTaskDates.fulfilled, (state, action) => {
        const { categoryId, taskId, startDate, endDate } = action.payload;
        const category = state.categories.find(category => category.id === categoryId);
        if (category) {
          const task = category.tasks.find(task => task.id === taskId);
          if (task) {
            task.startDate = startDate;
            task.endDate = endDate;
          }
        }
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        const { categoryId, task } = action.payload;
        const category = state.categories.find(category => category.id === categoryId);
        if (category) {
          const taskToUpdate = category.tasks.find(t => t.id === task.id);
          if (taskToUpdate) {
            taskToUpdate.text = task.text;
          }
        }
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        const { categoryId, newName } = action.payload;
        const category = state.categories.find(category => category.id === categoryId);
        if (category) {
          category.name = newName;
        }
      })
      .addCase(archiveTask.fulfilled, (state, action) => {
        const { categoryId, taskId } = action.payload;
        const category = state.categories.find(category => category.id === categoryId);
        if (category) {
          category.tasks = category.tasks.filter(task => task.id !== taskId);
        }
      });
  }
});

export default categorySlice.reducer;
