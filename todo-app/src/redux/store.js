import { configureStore } from '@reduxjs/toolkit';
import categoryReducer from './categorySlice';

const store = configureStore({
  reducer: {
    categories: categoryReducer,
  },
});

export default store;
