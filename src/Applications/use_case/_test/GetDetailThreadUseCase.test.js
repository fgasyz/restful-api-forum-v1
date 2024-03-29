const ThreadRepository = require('../../../Domains/threads/ThreadRepository');
const GetDetailThreadUseCase = require('../GetDetailThreadUseCase');

describe('GetThreadUSeCase', () => {
  it('should orchestrating the get detail thread action correctly', async () => {
    const useCasePayload = {
      thread: 'thread-123',
    };

    const mockThreadRepository = new ThreadRepository();

    mockThreadRepository.getDetailThread = jest
      .fn()
      .mockImplementation(() => Promise.resolve());
    mockThreadRepository.verifyThreadExist = jest
      .fn()
      .mockImplementation(() => Promise.resolve());

    const getThreadUseCase = new GetDetailThreadUseCase({
      threadRepository: mockThreadRepository,
    });
    await getThreadUseCase.execute(useCasePayload.thread);
    expect(mockThreadRepository.verifyThreadExist).toBeCalledWith(
      useCasePayload.thread,
    );
    expect(mockThreadRepository.getDetailThread).toBeCalledWith(
      useCasePayload.thread,
    );
  });
});
