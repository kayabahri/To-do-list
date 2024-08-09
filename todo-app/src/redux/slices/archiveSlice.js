import { createSlice } from '@reduxjs/toolkit';
import { fetchArchivedTasks, archiveTask } from '../thunks/archiveThunks';

const archiveSlice = createSlice({
  name: 'archivedTasks',
  initialState: {
    tasks: [],
    status: 'idle',
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchArchivedTasks.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchArchivedTasks.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.tasks = action.payload;
      })
      .addCase(fetchArchivedTasks.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(archiveTask.fulfilled, (state, action) => {
        const { taskId } = action.payload;  // 'categoryId' kullanılmıyor, bu yüzden kaldırıldı
        state.tasks = state.tasks.filter(task => task.id !== taskId);
      });
  }
});

export default archiveSlice.reducer;
