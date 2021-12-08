/* eslint-disable lines-between-class-members */
/* eslint-disable no-undef */
const AddComment = require('../../Domains/comments/entities/AddComment');

class AddCommentUseCase {
  constructor({ threadRepository, commentRepository }) {
    this._threadRepository = threadRepository;
    this._commentRepository = commentRepository;
  }
  async execute(owner, threadId, useCasePayload) {
    const addComment = new AddComment(useCasePayload);
    await this._threadRepository.verifyThreadExist(threadId);
    return this._commentRepository.addComment(owner, threadId, addComment);
  }
}
module.exports = AddCommentUseCase;
