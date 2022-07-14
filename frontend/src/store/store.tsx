import { configureStore } from '@reduxjs/toolkit';
import playerActionReducer from '../actions/playerActionSlice';

const store = configureStore({
  reducer: {
    playerAction: playerActionReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
