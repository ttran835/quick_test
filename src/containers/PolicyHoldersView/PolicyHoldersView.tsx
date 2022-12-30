import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getPolicyholders } from '../../app/features/policyholders';
import { selectAllPolicyholderRowValues } from '../../app/features/policyholders/policyholdersSelectors';
import { Box } from '@mui/material';
import InfoTable from '../../components/InfoTable';

function PolicyHoldersView() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getPolicyholders());
  }, []);

  const policyholderRowValues = useAppSelector(selectAllPolicyholderRowValues);

  return (
    <Box sx={{ textAlign: 'center' }}>
      {policyholderRowValues.length > 0 &&
        policyholderRowValues.map((rowValues, i) => (
          <InfoTable header="Policyholders" rows={rowValues} key={i} />
        ))}
    </Box>
  );
}

export default PolicyHoldersView;
