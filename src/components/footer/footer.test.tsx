import React from 'react';
import { render, screen } from '@testing-library/react';
import { FooterComponent } from '.';

describe('FooterComponent', () => {
  it('should render properly', () => {
    render(<FooterComponent />);
    const footerRepoLinkElement = screen.getByText('Repository');
    expect(footerRepoLinkElement).toBeInTheDocument();
  });
});
