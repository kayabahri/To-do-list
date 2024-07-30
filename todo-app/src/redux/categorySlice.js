import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc, getDoc } from "firebase/firestore";
import { db } from '../firebaseConfig';

export const fetchCategories = createAsyncThunk(
  'categories/fetchCategories',
  async () => {
    const snapshot = await getDocs(collection(db, 'categories'));
    const categories = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return categories;
  }
);

export const addCategory = createAsyncThunk(
  'categories/addCategory',
  async (categoryName) => {
    const docRef = await addDoc(collection(db, 'categories'), { name: categoryName, tasks: [] });
    return { id: docRef.id, name: categoryName, tasks: [] };
  }
);

export const removeCategory = createAsyncThunk(
  'categories/removeCategory',
  async (categoryId) => {
    await deleteDoc(doc(db, 'categories', categoryId));
    return categoryId;
  }
);

export const addTask = createAsyncThunk(
  'categories/addTask',
  async ({ categoryId, taskText }) => {
    const categoryRef = doc(db, 'categories', categoryId);
    const categoryDoc = await getDoc(categoryRef);
    const categoryData = categoryDoc.data();
    const newTask = { id: Date.now().toString(), text: taskText, startDate: null, endDate: null };
    const updatedTasks = [...categoryData.tasks, newTask];
    await updateDoc(categoryRef, { tasks: updatedTasks });
    return { categoryId, newTask };
  }
);

export const removeTask = createAsyncThunk(
  'categories/removeTask',
  async ({ categoryId, taskId }) => {
    const categoryRef = doc(db, 'categories', categoryId);
    const categoryDoc = await getDoc(categoryRef);
    const categoryData = categoryDoc.data();
    const updatedTasks = categoryData.tasks.filter(task => task.id !== taskId);
    await updateDoc(categoryRef, { tasks: updatedTasks });
    return { categoryId, taskId };
  }
);

export const updateCategory = createAsyncThunk(
  'categories/updateCategory',
  async ({ categoryId, newName }) => {
    const categoryRef = doc(db, 'categories', categoryId);
    await updateDoc(categoryRef, { name: newName });
    return { categoryId, newName };
  }
);

export const updateTask = createAsyncThunk(
  'categories/updateTask',
  async ({ categoryId, taskId, updatedText }) => {
    const categoryRef = doc(db, 'categories', categoryId);
    const categoryDoc = await getDoc(categoryRef);
    const categoryData = categoryDoc.data();
    const updatedTasks = categoryData.tasks.map(task =>
      task.id === taskId ? { ...task, text: updatedText } : task
    );
    await updateDoc(categoryRef, { tasks: updatedTasks });
    return { categoryId, taskId, updatedText };
  }
);

export const setTaskDates = createAsyncThunk(
  'categories/setTaskDates',
  async ({ categoryId, taskId, startDate, endDate }) => {
    const categoryRef = doc(db, 'categories', categoryId);
    const categoryDoc = await getDoc(categoryRef);
    const categoryData = categoryDoc.data();
    const updatedTasks = categoryData.tasks.map(task =>
      task.id === taskId ? { ...task, startDate, endDate } : task
    );
    await updateDoc(categoryRef, { tasks: updatedTasks });
    return { categoryId, taskId, startDate, endDate };
  }
);

export const moveTask = createAsyncThunk(
  'categories/moveTask',
  async ({ fromCategoryId, taskId, toCategoryId, position }) => {
    const fromCategoryRef = doc(db, 'categories', fromCategoryId);
    const fromCategoryDoc = await getDoc(fromCategoryRef);
    const fromCategoryData = fromCategoryDoc.data();
    const task = fromCategoryData.tasks.find(task => task.id === taskId);

    const toCategoryRef = doc(db, 'categories', toCategoryId);
    const toCategoryDoc = await getDoc(toCategoryRef);
    const toCategoryData = toCategoryDoc.data();

    if (task) {
      const updatedFromTasks = fromCategoryData.tasks.filter(task => task.id !== taskId);
      await updateDoc(fromCategoryRef, { tasks: updatedFromTasks });

      const updatedToTasks = [
        ...toCategoryData.tasks.slice(0, position - 1),
        task,
        ...toCategoryData.tasks.slice(position - 1)
      ];
      await updateDoc(toCategoryRef, { tasks: updatedToTasks });

      return { fromCategoryId, toCategoryId, taskId, position };
    }
  }
);

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
        const { categoryId, newTask } = action.payload;
        const category = state.categories.find(category => category.id === categoryId);
        if (category) {
          category.tasks.push(newTask);
        }
      })
      .addCase(removeTask.fulfilled, (state, action) => {
        const { categoryId, taskId } = action.payload;
        const category = state.categories.find(category => category.id === categoryId);
        if (category) {
          category.tasks = category.tasks.filter(task => task.id !== taskId);
        }
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        const { categoryId, newName } = action.payload;
        const category = state.categories.find(category => category.id === categoryId);
        if (category) {
          category.name = newName;
        }
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        const { categoryId, taskId, updatedText } = action.payload;
        const category = state.categories.find(category => category.id === categoryId);
        if (category) {
          const task = category.tasks.find(task => task.id === taskId);
          if (task) {
            task.text = updatedText;
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
      .addCase(moveTask.fulfilled, (state, action) => {
        const { fromCategoryId, toCategoryId, taskId, position } = action.payload;
        const fromCategory = state.categories.find(category => category.id === fromCategoryId);
        const toCategory = state.categories.find(category => category.id === toCategoryId);

        if (fromCategory && toCategory) {
          const task = fromCategory.tasks.find(task => task.id === taskId);
          if (task) {
            fromCategory.tasks = fromCategory.tasks.filter(task => task.id !== taskId);
            toCategory.tasks.splice(position - 1, 0, task);
          }
        }
      });
  }
});

export default categorySlice.reducer;
