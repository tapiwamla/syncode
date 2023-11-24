import React from 'react';
import { render } from '@testing-library/react';
import Client from '/root/syncode/src/components/Client.test.js'; import React from 'react';
import { render } from '@testing-library/react';
import Client from '/root/syncode/src/components/Client'; // Corrected path

describe('Client', () => {
    // Mock data for testing
    const username = 'John Doe';

    it('renders correctly when a user joins the room', () => {
        // Render the Client component when a user joins
        const { getByText, getByAltText } = render(<Client username={username} />);

        // Assert that the username is displayed
        expect(getByText(username)).toBeInTheDocument();

        // Assert that the avatar is rendered
        const avatar = getByAltText(username);
        expect(avatar).toBeInTheDocument();
        expect(avatar).toHaveAttribute('src');
    });
}); import React from 'react';
import { render } from '@testing-library/react';
import Client from '/root/syncode/src/components/Client'; // Corrected path

describe('Client', () => {
    // Mock data for testing
    const username = 'John Doe';

    it('renders correctly when a user joins the room', () => {
        // Render the Client component when a user joins
        const { getByText, getByAltText } = render(<Client username={username} />);

        // Assert that the username is displayed
        expect(getByText(username)).toBeInTheDocument();

        // Assert that the avatar is rendered
        const avatar = getByAltText(username);
        expect(avatar).toBeInTheDocument();
        expect(avatar).toHaveAttribute('src');
    });
});

describe('Client', () => {
    // Mock data for testing
    const username = 'John Doe';

    it('renders correctly when a user joins the room', () => {
        // Render the Client component when a user joins
        const { getByText, getByAltText } = render(<Client username={username} />);

        // Assert that the username is displayed
        expect(getByText(username)).toBeInTheDocument();

        // Assert that the avatar is rendered
        const avatar = getByAltText(username);
        expect(avatar).toBeInTheDocument();
        expect(avatar).toHaveAttribute('src');
    });

    it('reflects the correct state when a user is disconnected', () => {
        // Render the Client component when a user is disconnected
        const { getByText } = render(<Client username={username} disconnected={true} />);

        // Assert that the username is still displayed
        expect(getByText(username)).toBeInTheDocument();

        // You might also check for a visual indication of disconnection if implemented
    });

    it('reflects code changes made by the user', () => {
        // Render the Client component with code changes
        const { getByText } = render(<Client username={username} codeChanges={true} />);

        // Assert that the username is displayed
        expect(getByText(username)).toBeInTheDocument();

        // You might also check for a visual indication of code changes if implemented
    });

    it('behaves as expected when a user leaves the room', () => {
        // Render the Client component when a user leaves
        const { queryByText, getByText } = render(<Client username={username} />);

        // Assert that the username is displayed
        expect(getByText(username)).toBeInTheDocument();

        // Simulate the user leaving the room, e.g., by unmounting the component
        // You might trigger this based on your application logic

        // Assert that the username is no longer in the document
        expect(queryByText(username)).toBeNull();
    });
});
