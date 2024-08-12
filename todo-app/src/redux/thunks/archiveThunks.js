import { createAsyncThunk } from '@reduxjs/toolkit';
import { doc, getDoc, updateDoc, arrayUnion, arrayRemove, setDoc, deleteDoc, collection, getDocs } from 'firebase/firestore';
import { db, auth } from '../../firebaseConfig';

// Görev arşivleme işlemi
export const archiveTask = createAsyncThunk(
  'categories/archiveTask',
  async ({ categoryId, taskId }, { rejectWithValue }) => {
    try {
      const user = auth.currentUser;
      if (!user || !categoryId || !taskId) throw new Error("Invalid user, category, or task ID");

      console.log("Fetching category from Firestore...");
      
      // Arşivlenmiş görevlerin kontrolü
      const archivedTaskRef = doc(db, 'users', user.uid, 'archived_tasks', taskId);
      const archivedTaskDoc = await getDoc(archivedTaskRef);

      if (archivedTaskDoc.exists()) {
        console.log("Task already archived:", taskId);
        return { categoryId, taskId };
      }

      const categoryRef = doc(db, 'users', user.uid, 'categories', categoryId);
      const categoryDoc = await getDoc(categoryRef);

      if (!categoryDoc.exists()) {
        console.log("Category not found for categoryId:", categoryId);
        throw new Error("Category not found");
      }

      const categoryData = categoryDoc.data();
      const task = categoryData.tasks.find(task => task.id === taskId);

      if (!task) {
        console.log("Task not found for taskId:", taskId, "in categoryId:", categoryId);
        throw new Error("Task not found");
      }

      await setDoc(archivedTaskRef, { ...task, categoryId, categoryName: categoryData.name });

      await updateDoc(categoryRef, {
        tasks: arrayRemove(task)
      });

      console.log("Task successfully archived:", taskId);

      return { categoryId, taskId, task: { id: taskId, ...task, categoryName: categoryData.name } };
    } catch (error) {
      console.error("Error in archiveTask:", error.message);
      return rejectWithValue(error.message);
    }
  }
);

// Arşivden Görevi Çıkarma
export const unarchiveTask = createAsyncThunk(
  'archivedTasks/unarchiveTask',
  async ({ taskId }, { rejectWithValue }) => {
    try {
      const user = auth.currentUser;
      if (!user || !taskId) throw new Error("Invalid user or task ID");

      console.log("Fetching task from archive...");

      const archivedTaskRef = doc(db, 'users', user.uid, 'archived_tasks', taskId);
      const archivedTaskDoc = await getDoc(archivedTaskRef);

      if (!archivedTaskDoc.exists()) {
        console.log("Archived task not found for taskId:", taskId);
        throw new Error("Archived task not found");
      }

      const taskData = archivedTaskDoc.data();
      const { categoryId, ...task } = taskData;

      const categoryRef = doc(db, 'users', user.uid, 'categories', categoryId);
      const categoryDoc = await getDoc(categoryRef);

      if (!categoryDoc.exists()) {
        console.log("Category not found for categoryId:", categoryId);
        throw new Error("Category not found");
      }

      await updateDoc(categoryRef, {
        tasks: arrayUnion({ id: taskId, ...task })
      });
      await deleteDoc(archivedTaskRef);

      console.log("Task successfully unarchived and restored to category:", categoryId);

      return { categoryId, taskId };
    } catch (error) {
      console.error("Error in unarchiveTask:", error.message);
      return rejectWithValue(error.message);
    }
  }
);

// Arşivden Görevi Silme
export const deleteArchivedTask = createAsyncThunk(
  'archivedTasks/deleteArchivedTask',
  async ({ taskId }, { rejectWithValue }) => {
    try {
      const user = auth.currentUser;
      if (!user || !taskId) throw new Error("Invalid user or task ID");

      console.log("Deleting task from archive...");

      const archivedTaskRef = doc(db, 'users', user.uid, 'archived_tasks', taskId);
      await deleteDoc(archivedTaskRef);

      console.log("Task successfully deleted from archive:", taskId);

      return { taskId };
    } catch (error) {
      console.error("Error in deleteArchivedTask:", error.message);
      return rejectWithValue(error.message);
    }
  }
);

// Arşivlenmiş görevleri getir
export const fetchArchivedTasks = createAsyncThunk('archivedTasks/fetchArchivedTasks', async () => {
  try {
    const user = auth.currentUser;
    if (!user) throw new Error("User not authenticated");

    const archivedTasksRef = collection(db, 'users', user.uid, 'archived_tasks');
    const snapshot = await getDocs(archivedTasksRef);

    snapshot.docs.forEach(doc => console.log(doc.data())); // Debugging için eklendi

    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error fetching archived tasks:", error.message);
    throw error;
  }
});
