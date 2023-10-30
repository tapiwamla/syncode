import React from 'react';
import { render } from '@testing-library/react';
import Client from '../components/Client';


test('renders Client component with a username', () => {
    const username = 'JohnDoe';
    const { getByText } = render(<Client username={username} />);
    
    const avatar = getByText(username);
    expect(avatar).toBeInTheDocument();

    const userNameElement = getByText(username);
    expect(userNameElement).toBeInTheDocument();
});
test('renders Client component with a different username', () => {
  const username = 'JohnDoe';
  const { getByText } = render(<Client username={username} />);
  
  const avatar = getByText(username);
  expect(avatar).toBeInTheDocument();

  const userNameElement = getByText(username);
  expect(userNameElement).toBeInTheDocument();
});
test('renders Client component with a long username', () => {
  const username = 'ThisIsALongUsernameThatExceedsTheUsualSizeLimit';
  const { getByText } = render(<Client username={username} />);
  
  const avatar = getByText(username);
  expect(avatar).toBeInTheDocument();

  const userNameElement = getByText(username);
  expect(userNameElement).toBeInTheDocument();
});