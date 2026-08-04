import { $ } from '@wdio/globals'

class HomePage {
  async openMenu(menu) {
    const menuButton = await $('//*[@resource-id="tab-profile"]/..');

    await menuButton.waitForDisplayed({ timeout: 100000 });
    await menuButton.click();

    await driver.pause(30000);
}
}

export default new HomePage();
