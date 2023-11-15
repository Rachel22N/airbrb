import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import InterfaceHeader from '../InterfaceHeader';
import { authLogout } from '../../apis';

const mockedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedNavigate
}));

jest.mock('../../apis', () => ({
  authLogout: jest.fn(),
}));

describe('InterfaceHeader', () => {
  it('renders the component', () => {
    render(<BrowserRouter><InterfaceHeader /></BrowserRouter>);
    expect(screen.getByAltText('AirBrB logo')).toBeInTheDocument();
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Login/Register')).toBeInTheDocument();
  });

  it('renders links differently when the user is logged in', () => {
    localStorage.setItem('userId', 'test@test.com');
    localStorage.setItem('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAdGVzdC5jb20iLCJpYXQiOjE2OTk5NDk0MTl9.WxQlgGBn13jH-2x07VaS1SgQNa4QP8XNwuQ7oQF00Rw');
    render(<BrowserRouter><InterfaceHeader /></BrowserRouter>);
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Logout')).toBeInTheDocument();
    expect(screen.queryByText('Login/Register')).not.toBeInTheDocument();
  });

  it('calls authLogout and clears localStorage when Logout is clicked', () => {
    localStorage.setItem('userId', 'test@test.com');
    localStorage.setItem('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAdGVzdC5jb20iLCJpYXQiOjE2OTk5NDk0MTl9.WxQlgGBn13jH-2x07VaS1SgQNa4QP8XNwuQ7oQF00Rw');
    render(<BrowserRouter><InterfaceHeader /></BrowserRouter>);

    // Click the "Logout" link
    fireEvent.click(screen.getByText('Logout'));
    // Check if authLogout is called
    expect(authLogout).toHaveBeenCalledTimes(1);
    // Check if localStorage is cleared
    expect(localStorage.getItem('token')).toBeNull();
    expect(localStorage.getItem('userId')).toBeNull();
    // Check if navigate is called with '/'
    expect(mockedNavigate).toHaveBeenCalledWith('/');
  });
});
