const AddThread = require('../AddThread');

describe('a RegisterThread entities', () => {
  it('should throw error when payload did not contain needed property', () => {
    const payload = {
      username: 'abc',
      title: 'cde',
    };
    expect(() => new AddThread(payload)).toThrowError(
      'REGISTER_THREAD.NOT_CONTAIN_NEEDED_PROPERTY',
    );
  });
  it('should throw error when payload did not meet data type specification', () => {
    const payload = {
      title: 500,
      body: {},
    };
    expect(() => new AddThread(payload)).toThrowError(
      'REGISTER_THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION',
    );
  });
  it('should create Register Thread object correctly', () => {
    const payload = {
      title: 'abc',
      body: 'abc',
      owner: 'user-123',
    };
    const { title, body } = new AddThread(payload);
    expect(title).toEqual(payload.title);
    expect(body).toEqual(payload.body);
  });
});
