import { $ } from '@wdio/globals'

class CadastroPage {
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

    async createAccount(firstName, lastName, phoneNumber, email, password, repassword) {
        await this.btnsignUp.waitForDisplayed({ timeout: 100000 });
        await this.btnsignUp.click();
        await this.firstName.setValue(firstName);
        await this.lastName.setValue(lastName);
        await this.phoneNumber.setValue(phoneNumber);
        await this.email.setValue(email);
        await this.password.setValue(password);
        await this.repassword.setValue(repassword);
        await this.btnCreate.click();
        await this.btnCreateWishlist.waitForDisplayed({ timeout: 100000 });
        await this.btnCreateWishlist.click();
        await this.btnCreateBack.click();
    }
}
export default new CadastroPage();