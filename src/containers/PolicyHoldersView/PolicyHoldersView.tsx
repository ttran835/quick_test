import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getPolicyholders } from '../../app/features/policyholders';
import { selectAllTransformedPolicyholders } from '../../app/features/policyholders/policyholdersSelectors';
import { Box } from '@mui/material';
import InfoTable from '../../components/InfoTable';

function PolicyHoldersView() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getPolicyholders());
  }, []);

  const allPolicyholders = useAppSelector(selectAllTransformedPolicyholders);

  return (
    <Box sx={{ textAlign: 'center' }}>
      {allPolicyholders.length > 0 &&
        allPolicyholders.map((policyholder) => (
          <InfoTable
            header="Policyholders"
            rows={policyholder.value}
            key={policyholder.entityId}
          />
        ))}
    </Box>
  );
}

export default PolicyHoldersView;
