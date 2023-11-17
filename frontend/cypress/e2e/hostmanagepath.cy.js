/* eslint-disable no-undef */

const rand = new Date().getTime();

function initiallization () {
  localStorage.removeItem('token');
  localStorage.removeItem('userId');
}

describe('accept a booking', () => {
  it('first create a listing and publish', () => {
    initiallization();
    cy.visit('http://localhost:3000');
    // register
    cy.get('a[href="/login"]').click();
    cy.get('a[href="/register"]').click();
    cy.get('input[id="emailInput"]').focus().type(`${rand}@test.com`);
    cy.get('input[id="passwordInput"]').focus().type('1234');
    cy.get('input[id="nameInput"]').focus().type(`${rand}`);
    cy.get('input[id="confirmPasswordInput"]').focus().type('1234');
    cy.contains('button', 'Submit').click();
    cy.contains('a', 'Dashboard').click();
    // create listing
    cy.contains('button', 'Create A New Listing').click();
    cy.get('input[id="propertyedit-thumbnail"]').selectFile('src/assets/sample.png');
    cy.get('input[id="propertyedit-imglist"]');
    cy.get('input[id="propertyedit-title"]').focus().type(`sample${rand}`);
    cy.get('input[id="propertyedit-address-street"]').focus().type('1 Lorne Ave');
    cy.get('input[id="propertyedit-address-city"]').focus().type('Kensington');
    cy.get('input[id="propertyedit-address-state"]').focus().type('NSW');
    cy.get('input[id="propertyedit-address-postcode"]').focus().type('2033');
    cy.get('input[id="propertyedit-address-country"]').focus().type('Australia');
    cy.get('select[id="propertyedit-type"]').select('House');
    cy.get('input[id="propertyedit-price"]').focus().type('405');
    cy.get('select[id="propertyedit-nbed"]').select('2');
    cy.get('select[id="propertyedit-nbath"]').select('2');
    cy.get('select[id="propertyedit-nroom"]').select('1');
    cy.get('input[id="propertyedit-amenities-wifi"]').check();
    cy.contains('button', 'Create').click()
    // publish
    cy.contains('button', 'Publish').click();
    cy.contains('button', 'Submit').click();
    // logout for changing user
    cy.contains('a', 'Logout').click();
  })

  it('login with client', () => {
    const newrand = new Date().getTime();
    cy.contains('a', 'Login').click();
    cy.get('a[href="/register"]').click();
    cy.url().should('include', 'register');
    cy.get('input[id="emailInput"]').focus().type(`${newrand}@test.com`);
    cy.get('input[id="passwordInput"]').focus().type('1234');
    cy.get('input[id="nameInput"]').focus().type(`${newrand}`);
    cy.get('input[id="confirmPasswordInput"]').focus().type('1234');
    cy.contains('button', 'Submit').click();
    // go to listing page
    cy.contains('button', 'Learn More').first().click();
    cy.get('input[type="date"]').first().focus().type('2023-11-11');
    cy.get('input[type="date"]').eq(1).focus().type('2023-11-13');
    cy.contains('button', 'Book').click();
    // logout for changing user
    cy.wait(5000);
    cy.contains('a', 'Logout').click();
  })

  it('host accept the booking', () => {
    cy.contains('a', 'Login').click();
    cy.get('input[id="emailInput"]').focus().type(`${rand}@test.com`);
    cy.get('input[id="passwordInput"]').focus().type('1234');
    cy.contains('button', 'Submit').click();
    cy.contains('a', 'Dashboard').click();
    cy.contains('button', 'Manage Booking').should('exist').click();
    cy.contains('h1', `sample${rand}`).should('exist');
    cy.contains('button', 'Accept').should('exist').click();
    cy.contains(/Booking\shas\sbeen\saccepted/i).should('exist');
    // logout for changing user
    cy.contains('a', 'Logout').click();
  })
})
