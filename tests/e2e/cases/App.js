import { App } from '../pages';
import { login } from '../helpers/util';
import config from '../config';

const page = new App();

fixture('App')
  .page(config.webUrl)
  .beforeEach(async (t) => {
    const adminRole = await login();
    await t.useRole(adminRole);
  });

test('should loads app', async (t) => {
  await t
    .expect(page.container.exists).ok()
    .expect(page.navMenu.exists).ok()
    .expect(page.userMenu.exists)
    .ok();
});

test('should update products', async (t) => {
  const updater = page.navMenu.find('li[role=updater]').nth(0).find('button');
  await t
    .expect(page.navMenu.exists).ok()
    .click(updater)
    .wait(500)
    .expect(updater.find('img#spinner')).ok()
    .wait(15000)
    .expect(updater.find('img#success')).ok();
});
