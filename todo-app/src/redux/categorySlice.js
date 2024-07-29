import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  categories: []
};

const categorySlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    addCategorySuccess: (state, action) => {
      const newCategory = {
        id: Date.now(),
        name: action.payload,
        tasks: []
      };
      state.categories.push(newCategory);
    },
    removeCategorySuccess: (state, action) => {
      state.categories = state.categories.filter(
        (category) => category.id !== action.payload
      );
    },
    addTaskSuccess: (state, action) => {
      const { categoryId, task } = action.payload;
      const category = state.categories.find((cat) => cat.id === categoryId);
      if (category) {
        const newTask = {
          id: Date.now(),
          text: task
        };
        category.tasks.push(newTask);
      }
    },
    removeTaskSuccess: (state, action) => {
      const { categoryId, taskId } = action.payload;
      const category = state.categories.find((cat) => cat.id === categoryId);
      if (category) {
        category.tasks = category.tasks.filter((task) => task.id !== taskId);
      }
    }
  }
});

export const {
  addCategorySuccess,
  removeCategorySuccess,
  addTaskSuccess,
  removeTaskSuccess
} = categorySlice.actions;

export const addCategory = (name) => (dispatch) => {
  dispatch(addCategorySuccess(name));
};

export const removeCategory = (categoryId) => (dispatch) => {
  dispatch(removeCategorySuccess(categoryId));
};

export const addTask = (categoryId, task) => (dispatch) => {
  dispatch(addTaskSuccess({ categoryId, task }));
};

export const removeTask = (categoryId, taskId) => (dispatch) => {
  dispatch(removeTaskSuccess({ categoryId, taskId }));
};

export default categorySlice.reducer;
