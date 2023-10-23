const ACTIONS = require('./Actions');

describe('ACTIONS', () => {
  it('should have a JOIN action', () => {
    expect(ACTIONS.JOIN).toBe('join');
  });

  it('should have a JOINED action', () => {
    expect(ACTIONS.JOINED).toBe('joined');
  });

  it('should have a DISCONNECTED action', () => {
    expect(ACTIONS.DISCONNECTED).toBe('disconnected');
  });

  it('should have a CODE_CHANGE action', () => {
    expect(ACTIONS.CODE_CHANGE).toBe('code-change');
  });

  it('should have a SYNC_CODE action', () => {
    expect(ACTIONS.SYNC_CODE).toBe('sync-code');
  });

  it('should have a LEAVE action', () => {
    expect(ACTIONS.LEAVE).toBe('leave');
  });

  it('should have a LEAVE_ROOM action', () => {
    expect(ACTIONS.LEAVE_ROOM).toBe('leave-room');
  });
});
