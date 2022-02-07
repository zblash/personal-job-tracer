import React from 'react';
import { render, screen } from '@testing-library/react';
import { HeaderComponent } from '.';

describe('HeaderComponent', () => {
  it('should render properly', () => {
    render(<HeaderComponent />);
    const titleElement = screen.getByText('Personal Job Tracer');
    expect(titleElement).toBeInTheDocument();
  });
});
