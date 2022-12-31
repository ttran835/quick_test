import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  createPolicyholder,
  getPolicyholders,
} from '../../app/features/policyholders';
import { selectAllTransformedPolicyholders } from '../../app/features/policyholders/policyholdersSelectors';
import { Box, Button, Typography } from '@mui/material';
import InfoTable from '../../components/InfoTable';
import { mockedPostPayloads } from './mockedPostPayloads';
import { Policyholder } from '../../app/features/policyholders/interfaces';

function PolicyHoldersView() {
  const dispatch = useAppDispatch();
  const allPolicyholders = useAppSelector(selectAllTransformedPolicyholders);

  useEffect(() => {
    if (allPolicyholders.length < 1) {
      dispatch(getPolicyholders());
    }
  }, [dispatch, allPolicyholders]);

  const _handleCreateNewPolicyHolder = (payload: Policyholder) => {
    dispatch(createPolicyholder(payload));
  };

  return (
    <Box sx={{ textAlign: 'center', display: 'grid', rowGap: '20px' }}>
      <Typography variant="h2" textAlign="center" marginBottom="24px">
        Policyholders
      </Typography>
      {allPolicyholders.length > 0 &&
        allPolicyholders.map((policyholder) => (
          <InfoTable
            header="Contact Information"
            rows={policyholder.value}
            key={policyholder.entityId}
          />
        ))}
      <Button
        onClick={() => _handleCreateNewPolicyHolder(mockedPostPayloads[0])}
        sx={{ margin: 'auto' }}
        variant="contained"
        color="warning"
        size="large"
      >
        Add Policyholder
      </Button>
      <Button
        onClick={() => _handleCreateNewPolicyHolder(mockedPostPayloads[1])}
        sx={{ margin: 'auto' }}
        variant="contained"
        color="warning"
        size="large"
      >
        Add Another Policyholder
      </Button>
    </Box>
  );
}

export default PolicyHoldersView;
