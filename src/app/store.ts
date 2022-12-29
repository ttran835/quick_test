import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import policyholdersReducer from './features/policyholders';

export const store = configureStore({
  reducer: {
    policyHolders: policyholdersReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
