import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import ItemPropertyGeneric from '../ItemPropertyGeneric';

describe('ItemPropertyGeneric', () => {
  // test: homepage listing item with provided data
  it('homepage listing item with provided data', () => {
    const given = {
      pid: 23232,
      title: 'A nice house, Ever!',
      thumb: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==',
      price: 100,
      reviews: [],
      status: 'accepted',
    };
    render(<BrowserRouter><ItemPropertyGeneric {...given} /></BrowserRouter>);

    // Check if elements with specific text/content are present
    expect(screen.getByText(/A nice house, Ever!/i)).toBeInTheDocument();
    expect(screen.getByText('#23232')).toBeInTheDocument();
    expect(screen.getByText('$100')).toBeInTheDocument();
    expect(screen.getByText('0 Reviews')).toBeInTheDocument();
    expect(screen.getByText('ACCEPTED')).toBeInTheDocument();

    // Check if the "Learn More" button is present and has the correct link
    const learnMoreButton = screen.getByRole('button', { name: 'Learn More' });
    expect(learnMoreButton).toBeInTheDocument();
    expect(learnMoreButton.parentElement.getAttribute('href')).toBe('/property/23232');
  });

  // test: homepage listing item without status
  it('homepage listing item without status', () => {
    const given = {
      pid: 23232,
      title: 'A nice house, Ever!',
      thumb: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==',
      price: 100,
      reviews: [],
      status: 'none',
    };
    render(<BrowserRouter><ItemPropertyGeneric {...given} /></BrowserRouter>);

    // Check if the status-specific elements are not present
    expect(screen.queryByText('ACCEPTED')).not.toBeInTheDocument();
    expect(screen.queryByText('PENDING')).not.toBeInTheDocument();
  });

  // test: homepage listing item with some reviews
  it('homepage listing item with some reviews', () => {
    const given = {
      pid: 23232,
      title: 'A nice house, Ever!',
      thumb: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==',
      price: 100,
      reviews: [
        { user: 'hey@a.com', review: 'hey', rate: 5 }
      ],
      status: 'accepted',
    };
    render(<BrowserRouter><ItemPropertyGeneric {...given} /></BrowserRouter>);
    expect(screen.getByText('1 Reviews')).toBeInTheDocument();
  });
});
