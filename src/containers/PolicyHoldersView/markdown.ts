export const ctaSummary = `
  ### Summary of CTA's

  The three buttons above mimics user form submit. Based on the requirement, I did not include a form
  for user to fill. When clicked, they will append a new and unique user to our redux state, rendering a
  new table in the process. Subsequent clicks should not add duplicate users. 
  I include a third button to return a 400 on purpose, with missing "age" field, mimicking 
  when user misses a field (server-side verification).
`;

export const features = `
  ### Remaning work

  **Features**:  
  Remaining features assuming this is an admin dashboard that can view multiple policyholders:
  * Allow user to update and delete policyholder with correct permission
  * Add form to add new policyholder
  * Add loading elements
  * Allow filters based on name, age, isPrimary, Phone number
  * Allow address filter based on line1, line2, city, state, zip
  * Show alert banner when new user is created (only errors are notified)
  * Add timer to alert banner
  * Refactor alert banner to be a global
`;

export const development = `
  **Development**:  
  Remaining development works assuming above feature requirements are true:
  * Add snapshot test coverage for components 
  * Add unit tests to error and success handling
  * Add end-to-end tests for user interactions 
  * Add more unit tests to cover for features from above
  * Create any necessary documenation surrounding the features 
    - Include any repository(ies) that this feature touches
    - Document edge case issues or feature related issue during development
`;
