/* eslint-disable no-undef */
/* eslint-disable n/handle-callback-err */
Cypress.on('uncaught:exception', (err, runnable) => {
  // returning false here prevents Cypress from
  // failing the test
  return false
})
