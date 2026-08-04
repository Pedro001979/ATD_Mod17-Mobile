import { $ } from '@wdio/globals'

class HomePageCadastro {
    async openMenuCadastro(menu) {
        // XPath direto pelo resource-id do elemento
        const menuButton = await $('//*[@resource-id="tab-profile"]');
        await menuButton.waitForDisplayed({ timeout: 100000 });
        await menuButton.click();
    }
}

export default new HomePageCadastro();