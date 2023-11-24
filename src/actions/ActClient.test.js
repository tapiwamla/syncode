import React from 'react';
import { render } from '@testing-library/react';
import Client from '../components/Client.test.js';

describe('Client', () => {
    const username = 'John Doe';

    it('renders correctly when a user joins the room', () => {
        const { getByText, getByAltText } = render(<Client username={username} />);
        expect(getByText(username)).toBeInTheDocument();

        const avatar = getByAltText(username);
        expect(avatar).toBeInTheDocument();
        expect(avatar).toHaveAttribute('src');
    });
});

it('reflects the correct state when a user is disconnected', () => {
    const { getByText } = render(<Client username={username} disconnected={true} />);
    expect(getByText(username)).toBeInTheDocument();
});

it('reflects code changes made by the user', () => {
    const { getByText } = render(<Client username={username} codeChanges={true} />);
    expect(getByText(username)).toBeInTheDocument();
});

it('behaves as expected when a user leaves the room', () => {
    const { queryByText, getByText } = render(<Client username={username} />);
    expect(getByText(username)).toBeInTheDocument();
    expect(queryByText(username)).toBeNull();
});