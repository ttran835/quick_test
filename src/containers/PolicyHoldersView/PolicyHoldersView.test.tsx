import { fireEvent, screen, waitFor } from '@testing-library/react';
import { getPolicyholders } from '../../app/features/policyholders';
import { mockNetworkResponse } from '../../app/features/policyholders/tests/utils';
import { store } from '../../app/store';
import { renderWithProviders } from '../../utils/test';
import PolicyHoldersView from './PolicyHoldersView';

describe('PolicyHoldersView', () => {
  beforeAll(() => {
    mockNetworkResponse();
  });

  describe('initial render', () => {
    it('should render initial components', async () => {
      const { getByText, getByTestId } = renderWithProviders(
        <PolicyHoldersView />,
        { store }
      );

      const header = getByText('Policyholders');
      const tableWrapper = getByTestId('policyholdersTable');

      expect(header.tagName).toBe('H2');
      expect(tableWrapper.children.length).toBe(0);
    });
  });

  describe('dispatch actions', () => {
    it('should render table with get network request', async () => {
      await store.dispatch(getPolicyholders());
      const { getByText, getByTestId } = renderWithProviders(
        <PolicyHoldersView />,
        { store }
      );

      const header = getByText('Policyholders');
      const tableWrapper = getByTestId('policyholdersTable');

      expect(header.tagName).toBe('H2');
      expect(tableWrapper.children.length).toBeGreaterThan(0);
    });

    it('should render correct address format', async () => {
      await store.dispatch(getPolicyholders());

      const { getAllByText } = renderWithProviders(<PolicyHoldersView />, {
        store,
      });

      const elements = getAllByText('Address');
      const allAddresses = elements.map(
        (el) => el.nextElementSibling?.innerHTML
      );

      expect(allAddresses[0]).toBe('123 Lane Ave, 3H, Santa Monica, CA, 90405');
    });

    it('should append new policyholder table to wrapper', async () => {
      await store.dispatch(getPolicyholders());

      const { getByText, getByTestId, getAllByText } = renderWithProviders(
        <PolicyHoldersView />,
        {
          store,
        }
      );

      const button = getByText('Add Policyholder');
      fireEvent.click(button);

      await waitFor(() => screen.getByText('Mr. Holdertest'));

      const tableWrapper = getByTestId('policyholdersTable');
      const nameElements = getAllByText('Name');
      const allNames = nameElements.map(
        (el) => el.nextElementSibling?.innerHTML
      );

      expect(tableWrapper.children.length).toBe(2);
      expect(allNames).toEqual(['Mrs. Holdertest', 'Mr. Holdertest']);
    });
  });
});
