import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import policyholdersReducer from './features/policyholders';

export function setupStore() {
  return configureStore({
    reducer: {
      policyholders: policyholdersReducer,
    },
  });
}

export const store = setupStore();

export type AppDispatch = typeof store.dispatch;
export type AppStore = ReturnType<typeof setupStore>;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
