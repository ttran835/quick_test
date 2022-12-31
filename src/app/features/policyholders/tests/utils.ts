import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { SURE_API } from '../../../../constants/apiLinks';

export const mockNetworkResponse = () => {
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
