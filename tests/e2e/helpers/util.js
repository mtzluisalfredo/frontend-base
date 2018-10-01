import { ClientFunction, Role } from 'testcafe';
import config from '../config';

export const getWindowLocation = ClientFunction(() => window.location);

export const login = async () => {
  const admin = Role(`${config.webUrl}login`, async (t) => {
    await t
      .typeText('#email', 'admin@email.com')
      .typeText('#password', '12345678')
      .click('#button-login');
  });
  return admin;
};
