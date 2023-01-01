import React from 'react';
import { Button, ButtonGroup } from '@mui/material';
import { useAppDispatch } from '../../../app/hooks';
import { mockedPostPayloads } from '../mockedPostPayloads';
import { Policyholder } from '../../../app/features/policyholders/interfaces';
import { createPolicyholder } from '../../../app/features/policyholders';

function CtaButtonGroup() {
  const dispatch = useAppDispatch();

  /**
   * I would not use Partial like this in real production code
   * This is done along with type casting to app to trigger error
   * When an invalid payload is submitted (we would validate client-side as well)
   */
  const _handleCreateNewPolicyHolder = (payload: Partial<Policyholder>) => {
    dispatch(createPolicyholder(payload as Policyholder));
  };

  return (
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
      <Button
        onClick={() => _handleCreateNewPolicyHolder(mockedPostPayloads[2])}
      >
        Add Invalid Policyholder
      </Button>
    </ButtonGroup>
  );
}

export default CtaButtonGroup;
