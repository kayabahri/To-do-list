import { createAsyncThunk } from '@reduxjs/toolkit';
import { collection, getDocs, addDoc, deleteDoc, doc, getDoc, updateDoc } from 'firebase/firestore';
import { db, auth } from '../../firebaseConfig';

// Kategorileri getir
export const fetchCategories = createAsyncThunk('categories/fetchCategories', async () => {
  const user = auth.currentUser;
  if (!user) throw new Error("User not authenticated");

  const categoriesRef = collection(db, 'users', user.uid, 'categories');
  const snapshot = await getDocs(categoriesRef);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
});

// Kategori ekle
export const addCategory = createAsyncThunk('categories/addCategory', async (categoryName) => {
  const user = auth.currentUser;
  if (!user) throw new Error("User not authenticated");

  const categoriesRef = collection(db, 'users', user.uid, 'categories');
  const newCategory = await addDoc(categoriesRef, { name: categoryName, tasks: [] });

  return { id: newCategory.id, name: categoryName, tasks: [] };
});

// Kategori kaldır
export const removeCategory = createAsyncThunk('categories/removeCategory', async (categoryId) => {
  const user = auth.currentUser;
  if (!user) throw new Error("User not authenticated");

  const categoryRef = doc(db, 'users', user.uid, 'categories', categoryId);
  await deleteDoc(categoryRef);

  return categoryId;
});

// Görev ekle
export const addTask = createAsyncThunk('categories/addTask', async ({ categoryId, taskText }) => {
  const user = auth.currentUser;
  if (!user) throw new Error("User not authenticated");

  const categoryRef = doc(db, 'users', user.uid, 'categories', categoryId);
  const categoryDoc = await getDoc(categoryRef);

  if (!categoryDoc.exists()) throw new Error("Category not found");

  const categoryData = categoryDoc.data();
  const newTask = { id: new Date().toISOString(), text: taskText };
  const updatedTasks = [...categoryData.tasks, newTask];

  await updateDoc(categoryRef, { tasks: updatedTasks });

  return { categoryId, id: newTask.id, text: taskText };
});

// Görev sil
export const removeTask = createAsyncThunk('categories/removeTask', async ({ categoryId, taskId }) => {
  const user = auth.currentUser;
  if (!user) throw new Error("User not authenticated");

  const categoryRef = doc(db, 'users', user.uid, 'categories', categoryId);
  const categoryDoc = await getDoc(categoryRef);

  if (!categoryDoc.exists()) throw new Error("Category not found");

  const categoryData = categoryDoc.data();
  const updatedTasks = categoryData.tasks.filter(task => task.id !== taskId);

  await updateDoc(categoryRef, { tasks: updatedTasks });

  return { categoryId, taskId };
});

// Görev güncelle
export const updateTask = createAsyncThunk('categories/updateTask', async ({ categoryId, taskId, updatedText }) => {
  const user = auth.currentUser;
  if (!user) throw new Error("User not authenticated");

  const categoryRef = doc(db, 'users', user.uid, 'categories', categoryId);
  const categoryDoc = await getDoc(categoryRef);

  if (!categoryDoc.exists) throw new Error("Category not found");

  const categoryData = categoryDoc.data();
  const updatedTasks = categoryData.tasks.map(task => 
    task.id === taskId ? { ...task, text: updatedText } : task
  );

  await updateDoc(categoryRef, { tasks: updatedTasks });

  return { categoryId, task: { id: taskId, text: updatedText } };
});

// Kategori güncelle
export const updateCategory = createAsyncThunk('categories/updateCategory', async ({ categoryId, newName }) => {
  const user = auth.currentUser;
  if (!user) throw new Error("User not authenticated");

  const categoryRef = doc(db, 'users', user.uid, 'categories', categoryId);
  await updateDoc(categoryRef, { name: newName });

  return { categoryId, newName };
});

// Görevleri taşı
export const moveTask = createAsyncThunk('categories/moveTask', async ({ fromCategoryId, toCategoryId, taskId, position }) => {
  const user = auth.currentUser;
  if (!user) throw new Error("User not authenticated");

  const fromCategoryRef = doc(db, 'users', user.uid, 'categories', fromCategoryId);
  const toCategoryRef = doc(db, 'users', user.uid, 'categories', toCategoryId);

  const fromCategoryDoc = await getDoc(fromCategoryRef);
  const toCategoryDoc = await getDoc(toCategoryRef);

  if (!fromCategoryDoc.exists || !toCategoryDoc.exists) throw new Error("Category not found");

  const fromCategoryData = fromCategoryDoc.data();
  const toCategoryData = toCategoryDoc.data();

  const task = fromCategoryData.tasks.find(task => task.id === taskId);
  const updatedFromTasks = fromCategoryData.tasks.filter(task => task.id !== taskId);
  const updatedToTasks = [...toCategoryData.tasks];
  updatedToTasks.splice(position, 0, task);

  await updateDoc(fromCategoryRef, { tasks: updatedFromTasks });
  await updateDoc(toCategoryRef, { tasks: updatedToTasks });

  return { fromCategoryId, toCategoryId, taskId: task.id, position };
});

// Görev tarihlerini belirle
export const setTaskDates = createAsyncThunk('categories/setTaskDates', async ({ categoryId, taskId, startDate, endDate }) => {
  const user = auth.currentUser;
  if (!user) throw new Error("User not authenticated");

  const categoryRef = doc(db, 'users', user.uid, 'categories', categoryId);
  const categoryDoc = await getDoc(categoryRef);

  if (!categoryDoc.exists) throw new Error("Category not found");

  const categoryData = categoryDoc.data();
  const updatedTasks = categoryData.tasks.map(task => 
    task.id === taskId ? { ...task, startDate, endDate } : task
  );

  await updateDoc(categoryRef, { tasks: updatedTasks });

  return { categoryId, taskId, startDate, endDate };
});
