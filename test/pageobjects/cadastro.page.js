import { $ } from '@wdio/globals'

class CadastroPage {
    // 1. Mapeamento dos elementos
    get btnsignUp() {
        return $('id:signUp')
    }

    get firstName() {
        return $('id:firstName')
    }

    get lastName() {
        return $('id:lastName')
    }

    get phoneNumber() {
        return $('id:phone')
    }

    get email() {
        return $('id:email')
    }

    get password() {
        return $('id:password')
    }

    get repassword() {
        return $('id:repassword')
    }

    get btnCreate() {
        return $('id:create')
    }

    get btnCreateWishlist() {
        return $('id:wishlist')
    }

    get btnCreateBack() {
        return $('id:back')
    }

    // 2. Método de Execução
    async createAccount(firstName, lastName, phoneNumber, email, password, repassword) {
        // CORRIGIDO: mudado de this.signUpButton para this.btnsignUp
        await this.btnsignUp.waitForDisplayed({ timeout: 15000 });
        await this.btnsignUp.click();

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

        // Submissão e telas finais
        await this.btnCreate.waitForDisplayed({ timeout: 10000 });
        await this.btnCreate.click();

        await this.btnCreateWishlist.waitForDisplayed({ timeout: 15000 });
        await this.btnCreateWishlist.click();

        await this.btnCreateBack.waitForDisplayed({ timeout: 10000 });
        await this.btnCreateBack.click();
    }
}

export default new CadastroPage();