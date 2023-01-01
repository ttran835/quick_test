import {
  challenge1,
  challenge2,
  challenge3,
  challenge4,
  challenge5,
  challenge6,
  challenge7,
  challenge8,
  challenge9,
  welcome,
} from './markdown';

const instructions = [
  {
    title: 'Getting started',
    label: welcome,
  },
  {
    title: '1. Update NavBar link behavior \u2713',
    label: challenge1,
  },
  {
    title: '2. Add a unit test \u2713',
    label: challenge2,
  },
  {
    title: '3. Add another unit test \u2713',
    label: challenge3,
  },
  {
    title: '4. Update the footer position \u2713',
    label: challenge4,
  },
  {
    title: '5. Integrate with the backend API \u2713',
    label: challenge5,
  },
  {
    title: '6. Render the results of the first GET request \u2713',
    label: challenge6,
  },
  {
    title: '7. Add a feature to create a policyholder \u2713',

    label: challenge7,
  },
  {
    title: '8. Render the results of the second API request \u2713',
    label: challenge8,
  },
  {
    title: "9. List remaining to-do's before release \u2713",
    label: challenge9,
  },
];

export default instructions;
