import config from '../config';
import { Login } from '../pages';
import { getWindowLocation } from '../helpers/util';

const page = new Login();
const text = 'Algunos de los campos son incorrectos. Inténtalo de nuevo.';

fixture('Login page')
  .page(`${config.webUrl}login`);

test('It should render email, password and submit button elements', async (t) => {
  await t
    .expect(page.emailInput.exists).ok()
    .expect(page.passwordInput.exists).ok()
    .expect(page.submitButton.exists)
    .ok();
});

test('It should redirect to /recover-password when forgot password button is clicked', async (t) => {
  await t
    .expect(page.recoveryButton.exists).ok()
    .click(page.recoveryButton);
  const location = await getWindowLocation();

  await t
    .expect(location.href)
    .contains(`${config.webUrl}recover-password`);
});

test('It should show and error message when email and password are invalid', async (t) => {
  await t
    .typeText(page.emailInput, 'email@email.com')
    .typeText(page.passwordInput, 'mypassword')
    .click(page.submitButton)
    .wait(1500)
    .expect(page.errorText.innerText)
    .eql(text);
});

test('It should not allow to click submit button while inputs are empty', async (t) => {
  await t
    .expect(page.emailInput.value).eql('')
    .expect(page.passwordInput.value).eql('')
    .expect(page.submitButton.hasAttribute('disabled'))
    .ok();
});

test('It should redirect to admin area when email and password ara valid', async (t) => {
  await t
    .typeText(page.emailInput, 'admin@email.com')
    .typeText(page.passwordInput, '12345678')
    .click(page.submitButton);
  const location = await getWindowLocation();
  await t
    .expect(location.href)
    .contains(config.webUrl);
});
