/* eslint-disable no-undef */

const rand = new Date().getTime();

function initiallization () {
  localStorage.removeItem('token');
  localStorage.removeItem('userId');
}

describe('user happy path defined in spec', () => {
  it('visite the site and check basic elements', () => {
    initiallization();
    cy.visit('http://localhost:3000');
    cy.get('img[alt="AirBrB logo"]').should('exist');
    cy.get('a[href="/"]').should('exist');
    cy.get('a[href="/login"]').should('exist');
    cy.get('input[name="home-searchgroup-keyword"]').should('exist');
    cy.get('select[name="home-searchgroup-numBed"]').should('exist');
    cy.get('input[name="home-searchgroup-range-from"]').should('exist');
    cy.get('input[name="home-searchgroup-range-to"]').should('exist');
    cy.get('input[name="home-searchgroup-price-from"]').should('exist');
    cy.get('input[name="home-searchgroup-price-to"]').should('exist');
    cy.get('select[name="home-searchgroup-sortRate"]').should('exist');
  })

  it('register', () => {
    cy.get('a[href="/login"]').click();
    cy.url().should('include', 'login');
    cy.get('input[id="emailInput"]').should('exist');
    cy.get('input[id="passwordInput"]').should('exist');
    cy.get('a[href="/register"]')
      .should('exist')
      .click()
    cy.url().should('include', 'register');
    cy.get('input[id="emailInput"]')
      .should('exist')
      .focus()
      .type(`${rand}@test.com`)
    cy.get('input[id="passwordInput"]')
      .should('exist')
      .focus()
      .type('1234')
    cy.get('input[id="nameInput"]')
      .should('exist')
      .focus()
      .type(`${rand}`)
    cy.get('input[id="confirmPasswordInput"]')
      .should('exist')
      .focus()
      .type('1234')
    cy.contains('button', 'Submit')
      .should('exist')
      .click()
    cy.contains('a', 'Dashboard')
      .should('exist')
      .click()
    cy.url().should('include', 'dashboard');
  })

  it('create property', () => {
    cy.contains('button', 'Create A New Listing')
      .should('exist')
      .click()
    // navigate to /property/new
    cy.url().should('include', '/property/new')
    cy.get('input[id="propertyedit-thumbnail"]')
      .should('exist')
      .selectFile('src/assets/sample.png')
    cy.get('input[id="propertyedit-imglist"]').should('exist');
    cy.get('input[id="propertyedit-title"]')
      .should('exist')
      .focus()
      .type(`sample${rand}`)
    cy.get('input[id="propertyedit-address-street"]')
      .should('exist')
      .focus()
      .type('1 Lorne Ave')
    cy.get('input[id="propertyedit-address-city"]')
      .should('exist')
      .focus()
      .type('Kensington')
    cy.get('input[id="propertyedit-address-state"]')
      .should('exist')
      .focus()
      .type('NSW')
    cy.get('input[id="propertyedit-address-postcode"]')
      .should('exist')
      .focus()
      .type('2033')
    cy.get('input[id="propertyedit-address-country"]')
      .should('exist')
      .focus()
      .type('Australia')
    cy.get('select[id="propertyedit-type"]')
      .should('exist')
      .select('House')
      .select('Apartment')
      .select('Studio')
    cy.get('input[id="propertyedit-price"]')
      .should('exist')
      .focus()
      .type('405')
    cy.get('select[id="propertyedit-nbed"]')
      .should('exist')
      .select('2')
    cy.get('select[id="propertyedit-nbath"]')
      .should('exist')
      .select('2')
    cy.get('select[id="propertyedit-nroom"]')
      .should('exist')
      .select('1')
    cy.get('input[id="propertyedit-amenities-wifi"]')
      .should('exist')
      .check()
    cy.get('input[id="propertyedit-amenities-park"]').should('exist');
    cy.get('input[id="propertyedit-amenities-ac"]').should('exist');
    cy.get('input[id="propertyedit-amenities-breakfast"]').should('exist');
    cy.get('input[id="propertyedit-amenities-pets"]').should('exist');
    cy.get('input[id="propertyedit-amenities-spa"]')
      .should('exist')
      .check()
    cy.contains('button', 'Create')
      .should('exist')
      .click()
    cy.url().should('include', '/dashboard');
  })

  it('update info', () => {
    cy.wait(5000);
    cy.contains(`sample${rand}`).should('exist');
    cy.contains(/2\sBed\s2\sBathroom/i).should('exist');
    cy.contains('button', 'Edit').should('exist').click();
    cy.url().should('include', 'edit');
    // update thumbnail & title
    cy.get('input[id="propertyedit-thumbnail"]')
      .should('exist')
      .selectFile('src/assets/sample2.png')
    cy.get('input[id="propertyedit-title"]')
      .should('exist')
      .focus()
      .clear()
      .type(`sample${rand}edit`)
    cy.contains('button', 'Save').should('exist').click();
    cy.url().should('include', '/dashboard');
  })

  it('publish', () => {
    cy.contains('button', 'Publish').should('exist').click();
    cy.get('input[type="date"]').should('exist');
    cy.contains('button', 'Submit').should('exist').click();
  })

  it('unpublish', () => {
    cy.contains('button', 'Unpublish').should('exist').click();
    cy.contains('button', 'Publish').should('exist').click();
    cy.contains('button', 'Submit').should('exist').click();
  })

  it('logout', () => {
    cy.contains('a', 'Logout').should('exist').click();
    cy.contains('a', 'Logout').should('not.exist');
    cy.contains('a', 'Login').should('exist');
  })

  it('log back', () => {
    cy.contains('a', 'Login').should('exist').click();
    cy.url().should('include', '/login');
    cy.get('input[id="emailInput"]').should('exist').focus().type(`${rand}@test.com`);
    cy.get('input[id="passwordInput"]').should('exist').focus().type('1234');
    cy.contains('button', 'Submit').should('exist').click();
    cy.contains('a', 'Login').should('not.exist');
  })

  it('make a booking', () => {
    // create a new user to ensure not to book his/her own property
    const newrand = new Date().getTime();
    cy.contains('a', 'Logout').should('exist').click();
    cy.contains('a', 'Login').should('exist').click();
    cy.get('a[href="/register"]').should('exist').click();
    cy.url().should('include', 'register');
    cy.get('input[id="emailInput"]').should('exist').focus().type(`${newrand}@test.com`);
    cy.get('input[id="passwordInput"]').should('exist').focus().type('1234');
    cy.get('input[id="nameInput"]').should('exist').focus().type(`${newrand}`);
    cy.get('input[id="confirmPasswordInput"]').should('exist').focus().type('1234');
    cy.contains('button', 'Submit').should('exist').click();
    cy.contains('a', 'Logout').should('exist');
    cy.contains('button', 'Learn More').should('exist').first().click();
    cy.url().should('include', 'property');
    cy.get('input[type="date"]').should('exist').first().focus().type('2023-11-11');
    cy.get('input[type="date"]').eq(1).focus().type('2023-11-13');
    cy.contains('button', 'Book').should('exist').click();
    cy.url().should('include', 'success');
    cy.wait(5000);
    cy.url().should('include', 'property');
  })
})
