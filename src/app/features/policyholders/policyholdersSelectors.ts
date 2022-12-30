import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../store';
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

export const selectAllPolicyholders = (state: RootState) =>
  state.policyHolders.values;

export const selectAllPolicyholderRowValues = createSelector(
  selectAllPolicyholders,
  (policyholders) =>
    policyholders.map((policyholder) => transformRowValue(policyholder))
);
