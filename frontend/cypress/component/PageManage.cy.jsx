/* eslint-disable no-undef */
/// <reference types='Cypress' />

import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import PageManage from '../../src/components/PageManage'

describe('PageManage Test', () => {
  beforeEach(() => {
    cy.mount(<BrowserRouter><PageManage /></BrowserRouter>);
  });

  it('should display pending booking cards correctly or show a message if none exist', () => {
    // defined fixed api
    cy.intercept('http://localhost:5005/listings/undefined?', {
      statusCode: 200,
      body: {
        listing: {
          id: 231132,
          title: 'Anyway House',
          postedOn: '2023-11-15'
        }
      }
    }).as('detail');
    cy.intercept('http://localhost:5005/bookings?', {
      statusCode: 200,
      body: {
        bookings: [
          {
            id: 82379187,
            owner: 'alis@test.com',
            dateRange: { start: '2023-11-16', end: '2023-11-17' },
            totalPrice: 800,
            listingId: 231132,
            status: 'pending'
          }
        ]
      }
    }).as('bookings');

    // wait api
    cy.wait('@detail');
    cy.wait('@bookings');

    // check elements
    cy.contains('h1', 'Anyway House').should('exist');
    cy.contains('p', '2').should('exist');
  })
})
