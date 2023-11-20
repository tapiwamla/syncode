import { initSocket } from './socket'; // Import your socket initialization function
import { io } from 'socket.io-client'; // Import the socket.io-client library

// Mock the socket.io-client library
jest.mock('socket.io-client', () => ({
  io: jest.fn(),
}));

describe('initSocket', () => {
  it('should initialize a socket connection', async () => {
    const mockSocketInstance = {}; // Mock socket instance

    // Mock the socket.io-client's 'io' method to return the mock socket instance
    io.mockReturnValue(mockSocketInstance);

    const socket = await initSocket();

    // Ensure that the 'io' method was called with the expected URL and options
    expect(io).toHaveBeenCalledWith(process.env.REACT_APP_BACKEND_URL, {
      'force new connection': true,
      reconnectionAttempt: 'Infinity',
      timeout: 10000,
      transports: ['websocket'],
    });

    // Ensure that the returned socket instance is the same as the mock socket instance
    expect(socket).toBe(mockSocketInstance);
  });
});

it('should handle errors during socket initialization', async () => {
  // Mocking io to throw an error
  io.mockImplementationOnce(() => {
      throw new Error('Socket initialization failed');
  });

  // Ensure that the function rejects with the expected error
  await expect(initSocket()).rejects.toThrow('Socket initialization failed');
});

