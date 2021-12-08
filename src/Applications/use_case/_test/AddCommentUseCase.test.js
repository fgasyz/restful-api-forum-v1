const CommentRepository = require('../../../Domains/comments/CommentRepository');
const AddComment = require('../../../Domains/comments/entities/AddComment');
const AddedComment = require('../../../Domains/comments/entities/AddedComment');
const ThreadRepository = require('../../../Domains/threads/ThreadRepository');
const AddCommentUseCase = require('../AddCommentUseCase');

describe('AddCommentUseCase', () => {
  it('should orcherstrating the add comment action correctly', async () => {
    const useCasePayload = {
      content: 'ini Content',
    };
    const expectedAddedComment = new AddedComment({
      id: 'comment-123',
      content: useCasePayload.content,
      thread: 'thread-123',
      owner: 'user-123',
    });
    const owner = 'user-123';
    const threadId = 'thread-123';

    const mockThreadRepository = new ThreadRepository();
    const mockCommentRepositoruy = new CommentRepository();

    mockThreadRepository.verifyThreadExist = jest
      .fn()
      .mockImplementation(() => Promise.resolve());
    mockCommentRepositoruy.addComment = jest
      .fn()
      .mockImplementation(() => Promise.resolve(expectedAddedComment));

    const getCommentUseCase = new AddCommentUseCase({
      threadRepository: mockThreadRepository,
      commentRepository: mockCommentRepositoruy,
    });

    const registeredComment = await getCommentUseCase.execute(
      owner,
      threadId,
      useCasePayload,
    );

    expect(registeredComment).toStrictEqual(expectedAddedComment);
    expect(mockThreadRepository.verifyThreadExist).toBeCalledWith(threadId);
    expect(mockCommentRepositoruy.addComment).toBeCalledWith(
      owner,
      threadId,
      new AddComment({
        content: useCasePayload.content,
      }),
    );
  });
});
