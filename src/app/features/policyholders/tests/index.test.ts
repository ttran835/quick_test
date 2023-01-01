import reducer, { getPolicyholders, createPolicyholder } from '../index';
import { store } from '../../../store';
import { Policyholder } from '../interfaces';
import { mockNetworkResponse } from './utils';

describe('policyholders redux store', () => {
  beforeAll(() => {
    mockNetworkResponse();
  });

  it('should return the initial state', () => {
    expect(reducer(undefined, { type: undefined })).toEqual({
      entities: {},
      ids: [],
      status: 'idle',
      hasError: false,
      errorMessage: '',
    });
  });

  describe('network requests', () => {
    it('should fetch policyholders', async () => {
      const { type, payload } = await store.dispatch(getPolicyholders());
      const { entities } = store.getState().policyholders;
      const result = entities['Mrs. Holdertest-1-989-989-9898'] as Policyholder;

      expect(payload.length).toBe(1);
      expect(type).toBe('policyholders/getPolicyholders/fulfilled');
      expect(result.age).toBe(31);
      expect(result.name).toBe('Mrs. Holdertest');
    });

    it('should add new policyholder to state on success', async () => {
      const mockedPayload = {
        name: 'Mr. Holdertest',
        age: 70,
        address: {
          line1: '123 Lane Ave',
          line2: '3H',
          city: 'Santa Monica',
          state: 'CA',
          postalCode: '90405',
        },
        phoneNumber: '1-989-989-9898',
        isPrimary: false,
      };
      const { type, payload } = await store.dispatch(
        createPolicyholder(mockedPayload)
      );
      const { entities } = store.getState().policyholders;
      const entitiesLength = Object.keys(entities).length;

      expect(payload.length).toBe(2);
      expect(type).toBe('policyholders/createPolicyholder/fulfilled');
      expect(entitiesLength).toBe(2);
    });
  });
});
