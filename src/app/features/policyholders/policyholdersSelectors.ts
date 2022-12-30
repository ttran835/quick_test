import { createSelector, nanoid } from '@reduxjs/toolkit';
import { policyholdersAdapter } from '.';
import { RootState, store } from '../../store';
import { Policyholder, PolicyholderAddress, PolicyKeys } from './interfaces';

function convertAddressToString(address: PolicyholderAddress): string {
  const result = Object.keys(address).map((key: string) => {
    const value = address[key as keyof PolicyholderAddress];
    return value;
  });

  return result.join(', ');
}

function transformRowValue(policyholder: Policyholder): {
  key: string;
  value: string | number;
}[] {
  const result = Object.keys(policyholder).map((key: string) => {
    let value = policyholder[key as keyof Policyholder];

    if (key === 'address') {
      value = convertAddressToString(value as PolicyholderAddress);
    }

    if (key === 'isPrimary') {
      value = value ? 'Primary' : 'Non-Primary';
    }

    return {
      key: PolicyKeys[key as keyof typeof PolicyKeys],
      value: value as string | number,
    };
  });

  return result;
}

const policyholdersSelectors = policyholdersAdapter.getSelectors<RootState>(
  (state) => state.policyholders
);

export const selectAllTransformedPolicyholders = createSelector(
  policyholdersSelectors.selectEntities,
  (policyholdersEntites) =>
    Object.keys(policyholdersEntites).map((entityId) => ({
      entityId,
      value: transformRowValue(policyholdersEntites[entityId] as Policyholder),
    }))
);
