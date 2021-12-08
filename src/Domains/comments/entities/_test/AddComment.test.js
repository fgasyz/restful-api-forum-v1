/* eslint-disable comma-dangle */
const AddComment = require('../AddComment');

describe('a REgisterComment entities', () => {
  it('should throw error when payload did not contain needed property', () => {
    const payload = {
      body: 'abc',
    };
    expect(() => new AddComment(payload)).toThrowError(
      'REGISTER_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY'
    );
  });
  it('should throw error when payload did not meet type specification', () => {
    const payload = {
      content: true,
    };
    expect(() => new AddComment(payload)).toThrowError(
      'REGISTER_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION'
    );
  });
  it('should create Register Comment object Correctly', () => {
    const payload = {
      content: 'content',
    };

    const { content } = new AddComment(payload);
    expect(content).toEqual(payload.content);
  });
});
