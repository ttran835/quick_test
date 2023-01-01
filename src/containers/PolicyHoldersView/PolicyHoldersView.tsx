import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getPolicyholders } from '../../app/features/policyholders';
import {
  selectAllTransformedPolicyholders,
  selectPolicyholderErrors,
} from '../../app/features/policyholders/policyholdersSelectors';
import { Box, Typography } from '@mui/material';
import InfoTable from '../../components/InfoTable';
import TransitionAlerts from '../../components/TransitionAlerts';
import MarkdownGroup from './components/MarkdownGroup';
import CtaButtonGroup from './components/CtaButtonGroup';

function PolicyHoldersView() {
  const dispatch = useAppDispatch();
  const allPolicyholders = useAppSelector(selectAllTransformedPolicyholders);
  const { hasError, errorMessage } = useAppSelector(selectPolicyholderErrors);

  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (allPolicyholders?.length < 1) {
      dispatch(getPolicyholders());
    }
  }, [dispatch, allPolicyholders]);

  useEffect(() => {
    setOpen(hasError);
  }, [hasError]);

  return (
    <Box sx={{ textAlign: 'center', display: 'grid', rowGap: '20px' }}>
      <TransitionAlerts
        open={open}
        close={() => setOpen(false)}
        alertProps={{ severity: 'error' }}
      >
        {errorMessage}
      </TransitionAlerts>

      <Typography variant="h2" textAlign="center" marginBottom="24px">
        Policyholders
      </Typography>

      <Box
        flexDirection="column"
        sx={{ display: 'flex', rowGap: '25px' }}
        data-testid="policyholdersTable"
      >
        {allPolicyholders?.length > 0 &&
          allPolicyholders.map((policyholder) => (
            <InfoTable
              header="Contact Information"
              rows={policyholder.value}
              key={policyholder.entityId}
            />
          ))}
      </Box>

      <CtaButtonGroup />
      <MarkdownGroup />
    </Box>
  );
}

export default PolicyHoldersView;
