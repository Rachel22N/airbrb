/* eslint-disable no-proto */
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { fireEvent, render, waitFor, screen } from '@testing-library/react';
import LoginForm from './LoginForm';

jest.spyOn(window, 'alert').mockImplementation(() => {});
jest.spyOn(window.localStorage.__proto__, 'setItem');

describe('loginForm Input Compnonet Test', () => {
  test('test input textarea', () => {
    const { getByText, getByLabelText } = render(
      <Router>
        <LoginForm />
      </Router>
    );
    const emailLabel = getByText('Email:');
    expect(emailLabel).toBeInTheDocument();
    const emailInput = getByLabelText('Email:');
    expect(emailInput).toBeInTheDocument();
    expect(emailInput.type).toBe('text');
    const pswdLabel = getByText('Password:');
    expect(pswdLabel).toBeInTheDocument();
    const pswdInput = getByLabelText('Password:');
    expect(pswdInput.type).toBe('password');
    expect(pswdInput).toBeInTheDocument();
  });
  test('should render registeration', () => {
    const { getByText } = render(
      <Router>
        <LoginForm />
      </Router>
    );
    const registerText = getByText(/don't have an account\?/i);
    expect(registerText).toBeInTheDocument();

    const registerLink = getByText('click here to register');
    expect(registerLink).toBeInTheDocument();
    expect(registerLink.getAttribute('href')).toBe('/register');
  })
});

jest.mock('../../apis', () => ({
  authLogin: jest.fn().mockResolvedValue({ token: 'fake_token' }),
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}));

// Storage.prototype.setItem = jest.fn();

describe('Login function with apis Test', () => {
  test('should handle login correctly', async () => {
    const authLogin = require('../../apis').authLogin;
    const setToken = jest.fn();

    const { getByText } = render(
      <Router>
        <LoginForm setToken={setToken} />
      </Router>
    );

    const cancelButton = getByText('Cancel');
    fireEvent.click(cancelButton);
    expect(cancelButton).toBeInTheDocument();

    const submitButton = getByText('Submit');
    fireEvent.change(screen.getByLabelText('Email:'), { target: { value: 'ano@test.com' } });
    fireEvent.change(screen.getByLabelText('Password:'), { target: { value: '1234' } });
    fireEvent.click(submitButton);
    expect(submitButton).toBeInTheDocument();
    await waitFor(() => {
      expect(authLogin).toHaveBeenCalledWith('ano@test.com', '1234');
      // expect(localStorage.setItem).toHaveBeenCalledWith('userId', expect.anything());
      // expect(localStorage.setItem).toHaveBeenCalledWith('token', 'fake_token');
      // expect(setToken).toHaveBeenCalledWith('fake_token');
    })
  })
})
