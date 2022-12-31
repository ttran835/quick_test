import reducer, { getPolicyholders, createPolicyholder } from '../index';
import { store } from '../../../store';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import { SURE_API } from '../../../../constants/apiLinks';
import { Policyholder } from '../interfaces';

const mockNetworkResponse = () => {
  const mockedGetResponse = {
    policyHolders: [
      {
        name: 'Mrs. Holdertest',
        age: 31,
        address: {
          line1: '123 Lane Ave',
          line2: '3H',
          city: 'Santa Monica',
          state: 'CA',
          postalCode: '90405',
        },
        phoneNumber: '1-989-989-9898',
        isPrimary: true,
      },
    ],
  };

  const mockedPostResponse = {
    policyHolders: [
      {
        name: 'Mrs. Holdertest',
        age: 31,
        address: {
          line1: '123 Lane Ave',
          line2: '3H',
          city: 'Santa Monica',
          state: 'CA',
          postalCode: '90405',
        },
        phoneNumber: '1-989-989-9898',
        isPrimary: true,
      },
      {
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
      },
    ],
  };
  const url = `${SURE_API}/policyholders`;

  const mock = new MockAdapter(axios);
  mock.onGet(url).reply(200, mockedGetResponse);
  mock.onPost(url).reply(200, mockedPostResponse);
};

describe('policyholders redux store', () => {
  beforeAll(() => {
    mockNetworkResponse();
  });

  it('should return the initial state', () => {
    expect(reducer(undefined, { type: undefined })).toEqual({
      entities: {},
      ids: [],
      status: 'idle',
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
