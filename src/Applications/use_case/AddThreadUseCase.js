/* eslint-disable no-undef */
const AddThread = require('../../Domains/threads/entities/AddThread');

class AddThreadUseCase {
  constructor({ threadRepository }) {
    this._threadRepository = threadRepository;
  }

  async execute(owner, useCasePayload) {
    const addThread = new AddThread(useCasePayload);
    return this._threadRepository.addThread(owner, addThread);
  }
}

module.exports = AddThreadUseCase;
