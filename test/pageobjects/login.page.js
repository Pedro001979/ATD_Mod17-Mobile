import { $, driver } from '@wdio/globals'

class LoginPage {

    get btnProfile() {
        return $('//android.widget.TextView[@resource-id="tab-profile"]')
    }

    // 1. Mapeamento dos elementos usando UiSelector pelo resourceId
    get email() {
        return $('android=new UiSelector().resourceId("email")')
    }

    get password() {
        return $('android=new UiSelector().resourceId("password")')
    }

    get loginButton() {
        return $('android=new UiSelector().text("Login")')
    }

    // 2. Método auxiliar para fechar teclado de forma segura
    async esconderTeclado() {
        try {
            if (await driver.isKeyboardShown()) {
                await driver.hideKeyboard()
            }
        } catch (e) { }
    }

    // 3. Método de Login limpo e robusto
    async login(email, password) {

        await this.btnProfile.waitForDisplayed()
        await this.btnProfile.click()

        // Preenche o E-mail
        await this.email.waitForDisplayed()     
        await this.email.click()
        await this.email.setValue(email)

        // Preenche a Senha
        await this.password.waitForDisplayed()
        await this.password.click()
        await this.password.setValue(password)

        // Oculta o teclado antes de clicar no botão
        await this.esconderTeclado()

        // Clica no botão de Login
        await this.loginButton.waitForDisplayed()
        await this.loginButton.click()

        await this.btnProfile.waitForDisplayed()
        await this.btnProfile.click()

    }
}

export default new LoginPage()