import React from 'react';
import { render, screen } from '@testing-library/react';
import HelloWorld from '../pages/HelloWorld';

test('renders learn react link', () => {
  render(<HelloWorld />);
  const linkElement = screen.getByText(/Hello world!/i);
  expect(linkElement).toBeInTheDocument();
});
