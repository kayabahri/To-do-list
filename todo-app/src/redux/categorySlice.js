import { createSlice } from '@reduxjs/toolkit';
import { db } from '../firebaseConfig';
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';

const initialState = {
  categories: [],
  loading: false,
  error: null
};

const categorySlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    fetchCategoriesStart(state) {
      state.loading = true;
    },
    fetchCategoriesSuccess(state, action) {
      state.loading = false;
      state.categories = action.payload;
    },
    fetchCategoriesFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    addCategorySuccess(state, action) {
      state.categories.push(action.payload);
    },
    removeCategorySuccess(state, action) {
      state.categories = state.categories.filter(cat => cat.id !== action.payload);
    },
    addTaskSuccess(state, action) {
      const { categoryId, task } = action.payload;
      const category = state.categories.find(cat => cat.id === categoryId);
      if (category) {
        category.tasks.push(task);
      }
    },
    removeTaskSuccess(state, action) {
      const { categoryId, taskId } = action.payload;
      const category = state.categories.find(cat => cat.id === categoryId);
      if (category) {
        category.tasks = category.tasks.filter(task => task.id !== taskId);
      }
    }
  }
});

export const {
  fetchCategoriesStart,
  fetchCategoriesSuccess,
  fetchCategoriesFailure,
  addCategorySuccess,
  removeCategorySuccess,
  addTaskSuccess,
  removeTaskSuccess
} = categorySlice.actions;

export const getCategories = () => async dispatch => {
  dispatch(fetchCategoriesStart());
  try {
    const querySnapshot = await getDocs(collection(db, 'categories'));
    const categories = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    dispatch(fetchCategoriesSuccess(categories));
  } catch (error) {
    dispatch(fetchCategoriesFailure(error.message));
    console.error("Error fetching categories: ", error);
  }
};

export const addCategory = (name) => async dispatch => {
  try {
    const docRef = await addDoc(collection(db, 'categories'), { name, tasks: [] });
    const newCategory = { id: docRef.id, name, tasks: [] };
    dispatch(addCategorySuccess(newCategory));
  } catch (error) {
    console.error('Error adding category: ', error);
  }
};

export const removeCategory = (id) => async dispatch => {
  try {
    await deleteDoc(doc(db, 'categories', id));
    dispatch(removeCategorySuccess(id));
  } catch (error) {
    console.error('Error removing category: ', error);
  }
};

export const addTask = ({ categoryId, task }) => async dispatch => {
  try {
    const taskObj = { id: Date.now().toString(), text: task };
    await updateDoc(doc(db, 'categories', categoryId), {
      tasks: arrayUnion(taskObj)
    });
    dispatch(addTaskSuccess({ categoryId, task: taskObj }));
  } catch (error) {
    console.error('Error adding task: ', error);
  }
};

export const removeTask = ({ categoryId, taskId }) => async dispatch => {
  try {
    const categoryRef = doc(db, 'categories', categoryId);
    const categorySnapshot = await getDocs(categoryRef);
    const categoryData = categorySnapshot.data();
    const taskToRemove = categoryData.tasks.find(task => task.id === taskId);

    await updateDoc(categoryRef, {
      tasks: arrayRemove(taskToRemove)
    });
    dispatch(removeTaskSuccess({ categoryId, taskId }));
  } catch (error) {
    console.error('Error removing task: ', error);
  }
};

export default categorySlice.reducer;
