import { createAsyncThunk } from '@reduxjs/toolkit';
import { collection, getDocs, doc, getDoc, setDoc, deleteDoc } from 'firebase/firestore';
import { db, auth } from '../../firebaseConfig';

// Görev arşivleme işlemi
export const archiveTask = createAsyncThunk(
  'categories/archiveTask',
  async ({ categoryId, taskId }, { rejectWithValue }) => {
    try {
      const user = auth.currentUser;
      if (!user || !categoryId || !taskId) throw new Error("Invalid user, category, or task ID");

      console.log("Fetching task from Firestore...");

      const taskRef = doc(db, 'users', user.uid, 'categories', categoryId, 'tasks', taskId);
      const taskDoc = await getDoc(taskRef);

      if (!taskDoc.exists()) throw new Error("Task not found");

      const taskData = taskDoc.data();

      // Arşivlenmiş görevler koleksiyonuna ekleme
      const archivedTaskRef = doc(db, 'users', user.uid, 'archived_tasks', taskId);
      await setDoc(archivedTaskRef, taskData);

      // Orijinal görevler koleksiyonundan silme
      await deleteDoc(taskRef);

      console.log("Task successfully archived:", taskId);

      return { categoryId, taskId };
    } catch (error) {
      console.error("Error in archiveTask:", error.message);
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

    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error fetching archived tasks:", error.message);
    throw error;
  }
});
