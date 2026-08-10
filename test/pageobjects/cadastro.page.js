import { $, driver } from '@wdio/globals'

class CadastroPage {

    // 1. Mapeamento por UiSelector direcionado ao resourceId
    get btnSignUp() {
        return $('android=new UiSelector().text("Sign up")')
    }

    get firstName() {
        return $('android=new UiSelector().text("firstName")')
    }

    get lastName() {
        return $('android=new UiSelector().text("lastName")')
    }

    get phoneNumber() {
        return $('android=new UiSelector().text("phoneNumber")')
    }

    get email() {
        return $('android=new UiSelector().text("email")')
    }

    get password() {
        return $('android=new UiSelector().text("password")')
    }

    // Rola a tela até encontrar o campo repassword caso esteja oculto
    get repassword() {
        return $('android=new UiScrollable(new UiSelector().scrollable(true)).scrollIntoView(new UiSelector().text("repassword"))')
    }

    // Rola a tela até encontrar o botão de criar conta
    get btnCreate() {
        return $('android=new UiScrollable(new UiSelector().scrollable(true)).scrollIntoView(new UiSelector().text("create"))')
    }

    get wishlist() {
        return $('android=new UiSelector().resourceId("wishlist")')
    }

    get back() {
        return $('android=new UiSelector().resourceId("back")')
    }


    // 2. Método auxiliar de preenchimento
    async preencherCampo(elemento, valor) {
        await elemento.waitForDisplayed({ timeout: 15000 })
        await elemento.click()
        await elemento.setValue(valor)
    }

    async esconderTeclado() {
        try {
            if (await driver.isKeyboardShown()) {
                await driver.hideKeyboard()
            }
        } catch (e) { }
    }

    // 3. Fluxo de execução
    async createAccount(firstName, lastName, phoneNumber, email, password, repassword) {
        // Clica no botão inicial para ir à tela de cadastro
        await this.btnSignUp.waitForDisplayed({ timeout: 15000 })
        await this.btnSignUp.click()

        // Preenche os campos
        await this.preencherCampo(this.firstName, firstName)
        await this.preencherCampo(this.lastName, lastName)
        await this.preencherCampo(this.phoneNumber, phoneNumber)
        await this.preencherCampo(this.email, email)
        await this.preencherCampo(this.password, password)
        await this.preencherCampo(this.repassword, repassword)

        await this.esconderTeclado()

        await this.btnCreate.waitForDisplayed({ timeout: 15000 })
        await this.btnCreate.click()

        await this.wishlist.waitForDisplayed({ timeout: 15000 })
        await this.wishlist.click()

        await this.back.waitForDisplayed({ timeout: 15000 })
        await this.back.click()

    }
}

export default new CadastroPage()