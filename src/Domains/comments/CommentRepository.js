/* eslint-disable lines-between-class-members */
class CommentRepository {
  async addComment(owner, threadId, addComment) {
    throw new Error('COMMENT_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }
  async deleteComment(id, owner, thread) {
    throw new Error('COMMENT_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }
  async verifyCommentExist(id) {
    throw new Error('COMMENT_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }
}
module.exports = CommentRepository;
