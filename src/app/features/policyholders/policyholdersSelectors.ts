import { createSelector } from '@reduxjs/toolkit';
import { policyholdersAdapter } from '.';
import { RootState } from '../../store';
import { Policyholder, PolicyholderAddress } from './interfaces';

function convertAddressToString(address: PolicyholderAddress): string {
  const { line1, line2, city, state, postalCode } = address;
  return `${line1}, ${line2}, ${city}, ${state}, ${postalCode}`;
}

function transformRowValue(policyholder: Policyholder): {
  key: string;
  value: string | number;
}[] {
  const { name, age, address, phoneNumber, isPrimary } = policyholder;

  return [
    { key: 'Name', value: name },
    { key: 'Age', value: age },
    { key: 'Address', value: convertAddressToString(address) },
    { key: 'Phone Number', value: phoneNumber },
    { key: 'Authorization', value: isPrimary ? 'Primary' : 'Non-Primary' },
  ];
}

const policyholdersSelectors = policyholdersAdapter.getSelectors<RootState>(
  (state) => state.policyholders
);

const selectPolicyholders = (state: RootState) => state.policyholders;

export const selectAllTransformedPolicyholders = createSelector(
  policyholdersSelectors.selectEntities,
  (policyholdersEntites) =>
    Object.keys(policyholdersEntites).map((entityId) => ({
      entityId,
      value: transformRowValue(policyholdersEntites[entityId] as Policyholder),
    }))
);

export const selectPolicyholderErrors = createSelector(
  selectPolicyholders,
  ({ hasError, errorMessage }) => ({ hasError, errorMessage })
);
