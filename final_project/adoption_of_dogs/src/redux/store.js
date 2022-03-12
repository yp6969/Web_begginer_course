import { configureStore } from '@reduxjs/toolkit';
import allDogsSlice from './allDogs';
import userConncection from './userConncection';
export const store = configureStore({
  reducer: {
    allDogs: allDogsSlice,
    user: userConncection,
  },
});
