import React from 'react';
import { render } from '@testing-library/react';
import Client from './Client';

describe('Client', () => {
  it('displays the username correctly', () => {
    const username = 'John Doe';
    const { getByText } = render(<Client username={username} />);

    expect(getByText(username)).toBeInTheDocument();
    expect(getByText(username)).toHaveClass('userName');
  });
});
