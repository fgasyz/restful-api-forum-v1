/* istanbul ignore file */
const Jwt = require('@hapi/jwt');

const ServerTestHelper = {
  async getAccessToken() {
    const userPayload = {
      id: 'user-123',
      password: '123456',
      username: 'dicoding',
      fullname: 'dicoding indonesia',
    };
    const accessToken = Jwt.token.generate(userPayload, process.env.ACCESS_TOKEN_KEY);

    return accessToken;
  },
};

module.exports = ServerTestHelper;
