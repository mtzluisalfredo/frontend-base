import { Selector } from 'testcafe';

class AppPage {
  constructor() {
    this.container = Selector('#app');
    this.navMenu = this.container.find('#sidebar ul').nth(0);
    this.userMenu = this.container.find('#sidebar ul').nth(1);
  }
}

export default AppPage;
