import expect from 'expect';

import { LoginService } from '../services/LoginService';
import { Credentials } from '../models/auth/Credentials';
import { UserInfoService } from '../services/UserInfoService';

Feature('User info card');

const loginService = new LoginService();
const userInfoService = new UserInfoService();

const validUser: Credentials = {
  username: 'valid.user@example.com',
  password: 'validPassword',
};

BeforeSuite(async () => {
  const { token } = await loginService.getToken(validUser);
  userInfoService.token = token;
});

Scenario('/userInfo should return user card', async () => {
  await userInfoService.requestGetUserInfo();

  expect(userInfoService.response.status).toBe(200);
  expect(userInfoService.response.data).not.toBeUndefined();
  expect(userInfoService.response.data.id).toBe(1234);
  expect(userInfoService.response.data.first_name).toEqual('User');
  expect(userInfoService.response.data.last_name).toEqual('Valid');
  expect(userInfoService.response.data.email).toEqual('valid.user@example.com');
});

Scenario('/userInfo unauthorized should return error', async () => {
  const unauthorizedUserInfoService = new UserInfoService();
  unauthorizedUserInfoService.token = 'unauthorized';

  try {
    await unauthorizedUserInfoService.requestGetUserInfo();
  } catch (e) {
    const { response } = e;

    expect(response.status).toBe(401);
    expect(response.data.error).toEqual('Not valid authorization token');
  }
});
