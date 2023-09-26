export 
const faker_condination = require('faker');

Cypress.Commands.add('generateRandomDateOfBirth', () => {
  const minDate = new Date(1950, 0, 1); // Set the minimum date for the random generation
  const maxDate = new Date(2003, 11, 31); // Set the maximum date for the random generation
  
  const randomDate = faker.date.between(minDate, maxDate);
  const formattedDate = Cypress.moment(randomDate).format('YYYY-MM-DD');
  
  return formattedDate;
});
