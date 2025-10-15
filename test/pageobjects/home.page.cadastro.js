import { $ } from '@wdio/globals'

class HomePageCadastro {
   async openMenuCadastro(menu) {
      await $(`id:tab-${menu}`).click();
   }
}

export default new HomePageCadastro();
