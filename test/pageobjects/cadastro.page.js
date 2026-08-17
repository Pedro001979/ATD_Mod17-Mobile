import { $, driver } from '@wdio/globals'

class CadastroPage {
    // 1. Locators
    get btnSignUp() { return $('android=new UiSelector().text("Sign up")') }
    get firstName() { return $('android=new UiSelector().text("firstName")') }
    get lastName() { return $('android=new UiSelector().text("lastName")') }
    get phoneNumber() { return $('android=new UiSelector().text("phoneNumber")') }
    get email() { return $('android=new UiSelector().text("email")') }
    get password() { return $('android=new UiSelector().text("password")') }
    get repassword() { return $('android=new UiScrollable(new UiSelector().scrollable(true)).scrollIntoView(new UiSelector().text("repassword"))') }
    get btnCreate() { return $('android=new UiScrollable(new UiSelector().scrollable(true)).scrollIntoView(new UiSelector().text("create"))') }
    get wishlist() { return $('android=new UiSelector().resourceId("wishlist")') }
    get back() { return $('android=new UiSelector().resourceId("back")') }

    // 2. Helpers
    async preencher(elemento, valor) {
      await elemento.waitForDisplayed({ timeout: 60000 })
        await elemento.setValue(valor)
    }

    async esconderTeclado() {
        if (await driver.isKeyboardShown()) {
            await driver.hideKeyboard().catch(() => {})
        }
    }

    async clicar(elemento) {
        await elemento.waitForDisplayed({ timeout: 60000 })
        await elemento.click()
    }

    // 3. Fluxo Principal
    async createAccount(firstName, lastName, phoneNumber, email, password, repassword) {
        await this.clicar(this.btnSignUp)

        await this.preencher(this.firstName, firstName)
        await this.preencher(this.lastName, lastName)
        await this.preencher(this.phoneNumber, phoneNumber)
        await this.preencher(this.email, email)
        await this.preencher(this.password, password)
        await this.preencher(this.repassword, repassword)

        await this.esconderTeclado()

        await this.clicar(this.btnCreate)
        await this.clicar(this.wishlist)
        await this.clicar(this.back)
    }
}

export default new CadastroPage()