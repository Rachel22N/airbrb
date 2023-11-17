/* eslint-disable no-undef */
/// <reference types="Cypress" />

import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import RegisterForm from '../../src/components/LoginRegister/Register';

describe('RegisterForm Test', () => {
  beforeEach(() => {
    cy.mount(<BrowserRouter><RegisterForm /></BrowserRouter>);
  })

  it('should display the registration form', () => {
    cy.get('#emailInput').should('be.visible');
    cy.get('#passwordInput').should('be.visible');
  });

  it('should allow user to type in the form fields', () => {
    const testEmail = 'test@example.com';
    const testPassword = 'password123';

    cy.get('#emailInput').type(testEmail).should('have.value', testEmail);
    cy.get('#passwordInput').type(testPassword).should('have.value', testPassword);
  });

  it('should submit the form successfully', () => {
    const testEmail = 'test@example.com';
    const testName = 'Test User';
    const testPassword = 'password123';
    const testConfirmPassword = 'password123';

    cy.get('#emailInput').type(testEmail);
    cy.get('#nameInput').type(testName);
    cy.get('#passwordInput').type(testPassword);
    cy.get('#confirmPasswordInput').type(testConfirmPassword);

    cy.get('button').contains('Submit').click();
  });
});
