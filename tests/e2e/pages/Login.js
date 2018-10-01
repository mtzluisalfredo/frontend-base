import { Selector } from 'testcafe';

class Login {
  constructor() {
    this.emailInput = Selector('#email');
    this.passwordInput = Selector('#password');
    this.submitButton = Selector('#button-login');
    this.recoveryButton = Selector('form > div:nth-child(3) > label > a');
    this.errorText = Selector('p');
  }
}

export default Login;
