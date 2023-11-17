/* eslint-disable no-undef */
/// <reference types='Cypress' />
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import PageEdit from '../../src/components/PagePropertyEdit/index';

describe('PageManage Test', () => {
  beforeEach(() => {
    cy.mount(
      <BrowserRouter>
        <PageEdit />
      </BrowserRouter>
    );
  });

  it('try to create a new property', () => {
    const testTitle = 'UNSW';
    cy.get('#propertyedit-title').type(testTitle).should('have.value', 'UNSW');
    const street = '1 Kensington Street';
    cy.get('#propertyedit-address-street')
      .type(street)
      .should('have.value', street);

    const city = 'Kensington';
    cy.get('#propertyedit-address-city').type(city).should('have.value', city);

    const state = 'NSW';
    cy.get('#propertyedit-address-state')
      .type(state)
      .should('have.value', state);

    const postcode = '2032';
    cy.get('#propertyedit-address-postcode')
      .type(postcode)
      .should('have.value', postcode);

    const country = 'Australia';
    cy.get('#propertyedit-address-country')
      .type(country)
      .should('have.value', country);

    cy.get('#propertyedit-type')
      .select('Studio')
      .should('have.value', 'Studio');

    const price = 378;
    cy.get('#propertyedit-price').type(price).should('have.value', 378);

    cy.get('#propertyedit-amenities-wifi').check().should('be.checked');
    cy.get('#propertyedit-amenities-ac').check().should('be.checked');
    cy.get('#propertyedit-amenities-spa').check().should('be.checked');

    // cy.fixture('1.png', 'base64').then(fileContent => {
    //   cy.get('input[type='file']').then(input => {
    //     const blob = Cypress.Blob.base64StringToBlob(fileContent, 'image/png');
    //     const file = new File([blob], 'example.png', { type: 'image/png' });
    //     const dataTransfer = new DataTransfer();

    //     dataTransfer.items.add(file);
    //     input[0].files = dataTransfer.files;
    //     input.trigger('change', { force: true });
    //   });
    cy.fixture('1.png', 'base64').then((fileContent) => {
      cy.get('input[type="file"]')
        .first()
        .then((input) => {
          const blob = Cypress.Blob.base64StringToBlob(
            fileContent,
            'image/png'
          );
          const file = new File([blob], '1.png', { type: 'image/png' });
          const dataTransfer = new DataTransfer();

          dataTransfer.items.add(file);
          input[0].files = dataTransfer.files;
          input.trigger('change', { force: true });
        });
    });
    cy.fixture('2.png', 'base64').then((fileContent) => {
      cy.get('input[type="file"]')
        .eq(1)
        .then((input) => {
          const blob = Cypress.Blob.base64StringToBlob(
            fileContent,
            'image/png'
          );
          const file = new File([blob], '2.png', { type: 'image/png' });
          const dataTransfer = new DataTransfer();

          dataTransfer.items.add(file);
          input[0].files = dataTransfer.files;
          input.trigger('change', { force: true });
        });
    });
    cy.get('button').contains('Create').click();
  });
});
