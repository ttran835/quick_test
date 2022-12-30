import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
  nanoid,
} from '@reduxjs/toolkit';
import axios from 'axios';

import { POLICYHOLDERS_API } from '../../../constants/apiLinks';
import { Policyholder } from './interfaces';
import { mockedPostPayloads } from './mockedPostPayloads';

const initialState: { status: 'idle' | 'loading' | 'failed' } = {
  status: 'idle',
};

// Uitlized nanoid since object in response data does not provide uniqueId
export const policyholdersAdapter = createEntityAdapter<Policyholder>({
  selectId: () => nanoid(),
});

export const getPolicyholders = createAsyncThunk(
  'policyholders/getPolicyholders',
  async () => {
    const response = await axios.get(`${POLICYHOLDERS_API}/policyholders`);
    return response.data.policyHolders;
  }
);

export const createPolicyholder = createAsyncThunk(
  'policyholders/postPolicyholder',
  async () => {
    const response = await axios.post(
      `${POLICYHOLDERS_API}/policyholders`,
      mockedPostPayloads[1]
    );

    return response.data.policyHolders;
  }
);

export const policyholdersSlice = createSlice({
  name: 'policyholders',
  initialState: policyholdersAdapter.getInitialState(initialState),
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {},
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    // GET
    builder.addCase(getPolicyholders.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(getPolicyholders.fulfilled, (state, action) => {
      state.status = 'idle';

      if (action.payload) {
        policyholdersAdapter.setAll(state, action.payload);
      }
    });

    // POST
    builder.addCase(createPolicyholder.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(createPolicyholder.fulfilled, (state, action) => {
      state.status = 'idle';

      if (action.payload) {
        policyholdersAdapter.setAll(state, action.payload);
      }
    });
  },
});

export default policyholdersSlice.reducer;
