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
    removeCategory: (state, action) => {
      state.categories = state.categories.filter(
        (category) => category.id !== action.payload
      );
    },
    addTask: (state, action) => {
      const { categoryId, taskText } = action.payload;
      const category = state.categories.find(
        (category) => category.id === categoryId
      );
      if (category) {
        category.tasks.push({
          id: Date.now().toString(),
          text: taskText
        });
      }
    },
    removeTask: (state, action) => {
      const { categoryId, taskId } = action.payload;
      const category = state.categories.find(
        (category) => category.id === categoryId
      );
      if (category) {
        category.tasks = category.tasks.filter((task) => task.id !== taskId);
      }
    },
    updateTask: (state, action) => {
      const { categoryId, taskId, updatedText } = action.payload;
      const category = state.categories.find(
        (category) => category.id === categoryId
      );
      if (category) {
        const task = category.tasks.find((task) => task.id === taskId);
        if (task) {
          task.text = updatedText;
        }
      }
    },
    updateCategory: (state, action) => {
      const { categoryId, updatedName } = action.payload;
      const category = state.categories.find(
        (category) => category.id === categoryId
      );
      if (category) {
        category.name = updatedName;
      }
    }
  }
});

export const {
  addCategory,
  removeCategory,
  addTask,
  removeTask,
  updateTask,
  updateCategory
} = categorySlice.actions;

export default categorySlice.reducer;
