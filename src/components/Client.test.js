import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom'; 
import {Client,add}  from '../components/Client';


test('renders Client component with a username', () => {
    const username = 'JohnDoe';
    const { getByText } = render(<Client username={username} />);
    
    const avatar = getByText(username);
    expect(avatar).toBeInTheDocument();

    const userNameElement = getByText(username);
    expect(userNameElement).toBeInTheDocument();
});
test('renders Client component with a different username', () => {
  const username = 'JaneSmith';
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
//test for the add function(unit test)
test('adds 1 + 2 to equal 3', () => {
  expect(add(1, 2)).toBe(3);
});
