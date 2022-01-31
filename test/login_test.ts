import expect from 'expect';
import { LoginService } from '../services/LoginService';
import { Credentials } from '../models/auth/Credentials';

Feature('Login');

const validUser: Credentials = {
  username: 'valid.user@example.com',
  password: 'validPassword',
};

Scenario('/login POST credentials should return actual token', async () => {
  const loginService = new LoginService();
  await loginService.requestGetToken(validUser);

  expect(loginService.response.status).toBe(200);
  expect(loginService.response.data.token).not.toBeUndefined();
  expect(loginService.response.data.token).toEqual(
    '9w2sa2337a2df03h6l85b4775q324ewp80e7'
  );
});
