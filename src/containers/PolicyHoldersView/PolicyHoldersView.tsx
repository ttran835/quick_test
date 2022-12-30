import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  createPolicyholder,
  getPolicyholders,
} from '../../app/features/policyholders';
import { selectAllTransformedPolicyholders } from '../../app/features/policyholders/policyholdersSelectors';
import { Box, Button, Typography } from '@mui/material';
import InfoTable from '../../components/InfoTable';

function PolicyHoldersView() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getPolicyholders());
  }, []);

  const allPolicyholders = useAppSelector(selectAllTransformedPolicyholders);

  const _handleCreateNewPolicyHolder = () => {
    dispatch(createPolicyholder());
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
        onClick={_handleCreateNewPolicyHolder}
        sx={{ margin: 'auto' }}
        variant="contained"
        color="warning"
        size="large"
      >
        Add Policyholder
      </Button>
    </Box>
  );
}

export default PolicyHoldersView;
