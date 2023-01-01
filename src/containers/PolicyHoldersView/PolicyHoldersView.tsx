import React, { useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  createPolicyholder,
  getPolicyholders,
} from '../../app/features/policyholders';
import { selectAllTransformedPolicyholders } from '../../app/features/policyholders/policyholdersSelectors';
import { Box, Button, ButtonGroup, Typography } from '@mui/material';
import InfoTable from '../../components/InfoTable';
import { mockedPostPayloads } from './mockedPostPayloads';
import { Policyholder } from '../../app/features/policyholders/interfaces';
import { development, features } from './markdown';

function PolicyHoldersView() {
  const dispatch = useAppDispatch();
  const allPolicyholders = useAppSelector(selectAllTransformedPolicyholders);

  useEffect(() => {
    if (allPolicyholders?.length < 1) {
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
      <ButtonGroup variant="contained" color="warning" sx={{ margin: 'auto' }}>
        <Button
          onClick={() => _handleCreateNewPolicyHolder(mockedPostPayloads[0])}
        >
          Add Policyholder
        </Button>
        <Button
          onClick={() => _handleCreateNewPolicyHolder(mockedPostPayloads[1])}
        >
          Add Another Policyholder
        </Button>
      </ButtonGroup>
      <Box textAlign="left" marginTop={2}>
        <Typography fontSize={18} fontWeight={600}>
          Remaning work
        </Typography>
        <ReactMarkdown>{features}</ReactMarkdown>
        <ReactMarkdown>{development}</ReactMarkdown>
      </Box>
    </Box>
  );
}

export default PolicyHoldersView;
