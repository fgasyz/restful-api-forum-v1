/* eslint-disable comma-dangle */
const CommentsTableTestHelper = require('../../../../tests/CommentsTableTestHelper');
const ThreadsTableTestHelper = require('../../../../tests/ThreadsTableTestHelper');
const ForbiddenError = require('../../../Commons/exceptions/ForbiddenError');
const NotFoundError = require('../../../Commons/exceptions/NotFoundError');
const AddComment = require('../../../Domains/comments/entities/AddComment');
const AddedComment = require('../../../Domains/comments/entities/AddedComment');
const pool = require('../../database/postgres/pool');
const CommentsRepositoryPostgres = require('../CommentsRepositoryPostgres');

describe('CommentRepositoryPostgres', () => {
  afterEach(async () => {
    await ThreadsTableTestHelper.cleanTable();
    await CommentsTableTestHelper.cleanTable();
  });
  afterAll(async () => {
    await pool.end();
  });
  describe('add comment function', () => {
    it('should return registered comment correctly', async () => {
      const registThread = {
        id: 'thread-00',
        title: ' ini tittle',
        body: 'ini body',
        owner: 'user-123',
      };

      await ThreadsTableTestHelper.addThread(registThread);
      const registerComment = new AddComment({
        content: 'ini content',
      });
      const fakeIdGenerator = () => '123';
      const commentRepositoryPostgres = new CommentsRepositoryPostgres(
        pool,
        fakeIdGenerator
      );

      const registeredComment = await commentRepositoryPostgres.addComment(
        'user-0',
        'thread-123',
        registerComment
      );
      expect(registeredComment).toStrictEqual(
        new AddedComment({
          id: 'comment-123',
          content: registerComment.content,
          owner: 'user-0',
        })
      );
    });
  });
  describe('verify comment exist function', () => {
    it('should throw error when comment not found', async () => {
      const commentId = 'comment-123';
      const commentRepositoryPostgres = new CommentsRepositoryPostgres(pool, {});
      await expect(
        commentRepositoryPostgres.verifyCommentExist(commentId)
      ).rejects.toThrowError(NotFoundError);
    });
    it('should not throw when comment exist', async () => {
      const commentId = 'comment-123';
      await CommentsTableTestHelper.addComment({ id: commentId });
      const commentRepositoryPostgres = new CommentsRepositoryPostgres(pool, {});
      await expect(
        commentRepositoryPostgres.verifyCommentExist(commentId)
      ).resolves.not.toThrowError(NotFoundError);
    });
  });
  describe('delete comment function', () => {
    it('should throw invariant error when different owner', async () => {
      const commentId = 'comment-123';
      const owner = 'user-1234';
      const thread = 'thread-123';
      await CommentsTableTestHelper.addComment({ id: commentId });
      const commentRepositoryPostgres = new CommentsRepositoryPostgres(pool, {});
      await expect(
        commentRepositoryPostgres.deleteComment(commentId, owner, thread)
      ).rejects.toThrowError(ForbiddenError);
    });
    it('should return object correctly', async () => {
      const commentId = 'comment-123';
      const owner = 'user-123';
      const thread = 'thread-123';
      await CommentsTableTestHelper.addComment({ id: commentId });
      const commentRepositoryPostgres = new CommentsRepositoryPostgres(pool, {});

      await commentRepositoryPostgres.deleteComment(commentId, owner, thread);
      const result = await CommentsTableTestHelper.findCommentDeletedById(
        commentId
      );

      expect(result).toHaveLength(1);
    });
  });
});
