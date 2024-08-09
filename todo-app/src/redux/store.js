import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { thunk } from 'redux-thunk'; // redux-thunk named export kullanıyor
import categoryReducer from './slices/categorySlice';
import archiveReducer from './slices/archiveSlice';

const rootReducer = combineReducers({
  categories: categoryReducer,
  archivedTasks: archiveReducer,
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['categories', 'archivedTasks'], // Sadece bu reducer'ları persist edeceğiz
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }).concat(thunk),
});

const persistor = persistStore(store);

export { store, persistor };
