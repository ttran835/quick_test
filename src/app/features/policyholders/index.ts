import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export interface PolicyHoldersState {
  values: string[];
  status: 'idle' | 'loading' | 'failed';
}

const initialState: PolicyHoldersState = {
  values: [],
  status: 'idle',
};

export const getPolicyholders = createAsyncThunk(
  'policyholders/fetchInfo',
  async () => {
    const response = await axios.get('/api/test');
    return response.data;
  }
);

export const policyholdersSlice = createSlice({
  name: 'policyholders',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {},
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder.addCase(getPolicyholders.fulfilled, (state, action) => {
      state.status = 'idle';

      if (action.payload) {
        state.values = action.payload;
      }
    });
  },
});

export default policyholdersSlice.reducer;
