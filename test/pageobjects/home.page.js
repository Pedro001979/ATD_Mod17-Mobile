import { $ } from '@wdio/globals'

class HomePage {
    async openMenu(menu) {
        const menuButton = await $('//*[@resource-id="tab-profile"]/..');
        await menuButton.waitForDisplayed({ timeout: 100000 });
        await menuButton.click();
        // Removido o driver.pause(30000) daqui!
    }
}

export default new HomePage();