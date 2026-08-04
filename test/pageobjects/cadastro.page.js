import { $ } from '@wdio/globals'

class CadastroPage {
    // 1. Mapeamento dos elementos
    get tabProfile() {
        return $('// *[@resource-id="tab-profile"]'); // Mapeia a aba perfil
    }

    get btnsignUp() {
        return $('id:signUp')
    }

    get firstName() { return $('id:firstName') }
    get lastName() { return $('id:lastName') }
    get phoneNumber() { return $('id:phone') }
    get email() { return $('id:email') }
    get password() { return $('id:password') }
    get repassword() { return $('id:repassword') }
    get btnCreate() { return $('id:create') }
    get btnCreateWishlist() { return $('id:wishlist') }
    get btnCreateBack() { return $('id:back') }

    // 2. Método de Execução
    async createAccount(firstName, lastName, phoneNumber, email, password, repassword) {
        // PASSO 1: Vai até a tela onde o botão de SignUp existe
        await this.tabProfile.waitForDisplayed({ timeout: 15000 });
        await this.tabProfile.click();

        // PASSO 2: Agora sim clica no botão Sign Up
        await this.btnsignUp.waitForDisplayed({ timeout: 15000 });
        await this.btnsignUp.click();

        // PASSO 3: Preenche o formulário
        await this.firstName.waitForDisplayed({ timeout: 15000 });
        await this.firstName.setValue(firstName);

        await this.lastName.waitForDisplayed({ timeout: 10000 });
        await this.lastName.setValue(lastName);

        await this.phoneNumber.waitForDisplayed({ timeout: 10000 });
        await this.phoneNumber.setValue(phoneNumber);

        await this.email.waitForDisplayed({ timeout: 10000 });
        await this.email.setValue(email);

        await this.password.waitForDisplayed({ timeout: 10000 });
        await this.password.setValue(password);

        await this.repassword.waitForDisplayed({ timeout: 10000 });
        await this.repassword.setValue(repassword);

        // PASSO 4: Finaliza
        await this.btnCreate.waitForDisplayed({ timeout: 10000 });
        await this.btnCreate.click();

        await this.btnCreateWishlist.waitForDisplayed({ timeout: 15000 });
        await this.btnCreateWishlist.click();

        await this.btnCreateBack.waitForDisplayed({ timeout: 10000 });
        await this.btnCreateBack.click();
    }
}

export default new CadastroPage();