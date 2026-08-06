import { $, expect, driver } from '@wdio/globals'

class CadastroPage {

    get btnSignUp() { return $('id:signUp') }

    get firstName() { return $('id:firstName') }

    get lastName() { return $('id:lastName') }

    get phoneNumber() { return $('id:phone') }

    get email() { return $('id:email') }

    get password() { return $('id:password') }

    get repassword() { return $('id:repassword') }

    get btnCreate() { return $('id:create') }

    get btnWishlist() { return $('id:wishlist') }

    get btnBack() { return $('id:back') }

    async preencherCampo(elemento, valor) {
        await elemento.waitForDisplayed({
            timeout: 30000
        })

        await elemento.click()

        try {
            await elemento.clearValue()
        } catch (e) { }

        await elemento.setValue(valor)

        await driver.pause(300)

        const texto = await elemento.getAttribute('text')

        // Validação corrigida para comparar strings diretamente:
        expect(texto).toBe(valor)
    }
    async esconderTeclado() {

        try {

            if (await driver.isKeyboardShown()) {

                await driver.hideKeyboard()

            }

        } catch (e) { }

    }

    async createAccount(firstName, lastName, phoneNumber, email, password, repassword) {

        await this.btnSignUp.waitForDisplayed({
            timeout: 30000
        })

        await this.btnSignUp.click()

        await this.preencherCampo(this.firstName, firstName)

        await this.preencherCampo(this.lastName, lastName)

        await this.preencherCampo(this.phoneNumber, phoneNumber)

        await this.preencherCampo(this.email, email)

        await this.preencherCampo(this.password, password)

        await this.preencherCampo(this.repassword, repassword)

        await this.esconderTeclado()

        await this.btnCreate.waitForDisplayed({
            timeout: 30000
        })

        await this.btnCreate.click()

        await this.btnWishlist.waitForDisplayed({
            timeout: 30000
        })

        await this.btnWishlist.click()

        await this.btnBack.waitForDisplayed({
            timeout: 30000
        })

        await this.btnBack.click()

    }

}

export default new CadastroPage()



// import { $ } from '@wdio/globals'

// class CadastroPage {
//     // 1. Mapeamento dos elementos
//     get tabProfile() {
//         return $('// *[@resource-id="tab-profile"]'); // Mapeia a aba perfil
//     }

//     get btnsignUp() {
//         return $('id:signUp')
//     }

//     get firstName() { return $('id:firstName') }
//     get lastName() { return $('id:lastName') }
//     get phoneNumber() { return $('id:phone') }
//     get email() { return $('id:email') }
//     get password() { return $('id:password') }
//     get repassword() { return $('id:repassword') }
//     get btnCreate() { return $('id:create') }
//     get btnCreateWishlist() { return $('id:wishlist') }
//     get btnCreateBack() { return $('id:back') }

//     // 2. Método de Execução
//     async createAccount(firstName, lastName, phoneNumber, email, password, repassword) {

//         await this.btnsignUp.waitForDisplayed({ timeout: 15000 });
//         await this.btnsignUp.click();

//         await this.firstName.waitForDisplayed();
//         await this.firstName.click();
//         await this.firstName.setValue(firstName);
//         await expect(this.firstName).toHaveText(firstName);

//         await this.lastName.waitForDisplayed();
//         await this.lastName.click();
//         await this.lastName.setValue(lastName);
//         await expect(this.lastName).toHaveText(lastName);

//         await this.phoneNumber.waitForDisplayed();
//         await this.phoneNumber.click();
//         await this.phoneNumber.setValue(phoneNumber);

//         await this.email.waitForDisplayed();
//         await this.email.click();
//         await this.email.setValue(email);

//         await this.password.waitForDisplayed();
//         await this.password.click();
//         await this.password.setValue(password);

//         await this.repassword.waitForDisplayed();
//         await this.repassword.click();
//         await this.repassword.setValue(repassword);

//         // Esconde teclado caso esteja aberto
//         try {
//             if (await driver.isKeyboardShown()) {
//                 await driver.hideKeyboard();
//             }
//         } catch (e) { }

//         await this.btnCreate.waitForDisplayed({ timeout: 15000 });
//         await this.btnCreate.click();

//         await this.btnCreateWishlist.waitForDisplayed({ timeout: 15000 });
//         await this.btnCreateWishlist.click();

//         await this.btnCreateBack.waitForDisplayed({ timeout: 15000 });
//         await this.btnCreateBack.click();
//     }
// }

// export default new CadastroPage();