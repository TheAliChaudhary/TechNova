import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import userReducer from './slices/userSlice';

const makeStore = () => {
  return configureStore({
    reducer: {
      auth: authReducer,
      users: userReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: ['persist/PERSIST'],
        },
      }),
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

// Create store instance
let storeInstance: AppStore | undefined;

export const getStore = () => {
  if (storeInstance === undefined) {
    storeInstance = makeStore();
  }
  return storeInstance;
};

export const store = getStore();
