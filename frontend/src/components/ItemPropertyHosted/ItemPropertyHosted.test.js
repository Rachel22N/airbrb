import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ItemPropertyHosted from '../ItemPropertyHosted';
import { listPublish } from '../../apis';

// Mock APIs
jest.mock('../../apis', () => ({
  listPublish: jest.fn(),
  listUnpublish: jest.fn(),
  listDelete: jest.fn(),
}));

localStorage.setItem('userId', 'test@test.com');
localStorage.setItem('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAdGVzdC5jb20iLCJpYXQiOjE2OTk5NDk0MTl9.WxQlgGBn13jH-2x07VaS1SgQNa4QP8XNwuQ7oQF00Rw');

describe('ItemPropertyHosted', () => {
  beforeEach(() => {
    // Clear mocks before each test
    jest.clearAllMocks();
  });

  it('dashboard listing item with provided data', () => {
    const given = {
      pid: 1,
      title: 'Randwick',
      ptype: 'House',
      nbed: 3,
      nbath: 2,
      thumb: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==',
      price: 100,
      reviews: [{ user: 'hey@b.com', rate: 4, review: 'brrrr' }],
      published: false,
    };
    render(<BrowserRouter><ItemPropertyHosted {...given} /></BrowserRouter>);

    // Check if elements with specific text/content are present
    expect(screen.getByText(/Randwick/i)).toBeInTheDocument();
    expect(screen.getByText('#1')).toBeInTheDocument();
    expect(screen.getByText(/House/i)).toBeInTheDocument();
    expect(screen.getByText(/3\sBed\s2\sBathroom/)).toBeInTheDocument();
    expect(screen.getByText('$100')).toBeInTheDocument();
    expect(screen.getByText(/1\sReviews/)).toBeInTheDocument();
  });

  it('a published listing should have unpublish', async () => {
    const given = {
      pid: 1,
      title: 'Randwick',
      ptype: 'House',
      nbed: 3,
      nbath: 2,
      thumb: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==',
      price: 100,
      reviews: [{ user: 'hey@b.com', rate: 4, review: 'brrrr' }],
      published: true,
    };
    render(<BrowserRouter><ItemPropertyHosted {...given} /></BrowserRouter>);
    expect(screen.getByRole('button', { name: 'Unpublish' })).toBeInTheDocument();
  })

  it('publish', async () => {
    const given = {
      pid: 1,
      title: 'Randwick',
      ptype: 'House',
      nbed: 3,
      nbath: 2,
      thumb: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==',
      price: 100,
      reviews: [{ user: 'hey@b.com', rate: 4, review: 'brrrr' }],
      published: false,
    };
    render(<BrowserRouter><ItemPropertyHosted {...given} /></BrowserRouter>);

    fireEvent.click(screen.getByRole('button', { name: 'Publish' }));
    expect(screen.getByText('Setup Availabilities')).toBeInTheDocument();
    listPublish.mockResolvedValueOnce({});
    fireEvent.click(screen.getByRole('button', { name: 'Add Range' }));
    listPublish.mockResolvedValueOnce({});
    fireEvent.click(screen.getByRole('button', { name: 'Submit' }));
    await waitFor(() => {
      expect(listPublish).toHaveBeenCalledWith(
        expect.any(String),
        1,
        expect.any(Array)
      );
    });
    // Check if the component state is updated
    expect(screen.getByRole('button', { name: 'Unpublish' })).toBeInTheDocument();
  });
});
