import { $, $$, driver } from '@wdio/globals'

class CadastroPage {

    // ==========================================
    // LOCATORS
    // ==========================================

    get btnSignUp() {
        return $('android=new UiSelector().text("Sign up")')
    }

    // Campos do formulário.
    // O Android expõe os inputs como android.widget.EditText.
    get firstName() {
        return $('//android.widget.EditText[1]')
    }

    get lastName() {
        return $('//android.widget.EditText[2]')
    }

    get phoneNumber() {
        return $('//android.widget.EditText[3]')
    }

    get email() {
        return $('//android.widget.EditText[4]')
    }

    get password() {
        return $('//android.widget.EditText[5]')
    }

    get repassword() {
        return $('//android.widget.EditText[6]')
    }

    get btnCreate() {
        return $('android=new UiSelector().text("create")')
    }

    get wishlist() {
        return $('android=new UiSelector().resourceIdMatches(".*:id/wishlist")')
    }

    get back() {
        return $('android=new UiSelector().resourceIdMatches(".*:id/back")')
    }


    // ==========================================
    // HELPERS
    // ==========================================

    async preencher(elemento, valor) {

        await elemento.waitForDisplayed({
            timeout: 60000
        })

        await elemento.click()

        await elemento.clearValue()

        await elemento.setValue(valor)
    }


    async esconderTeclado() {

        if (await driver.isKeyboardShown()) {
            await driver.hideKeyboard().catch(() => {})
        }
    }


    async clicar(elemento) {

        await elemento.waitForDisplayed({
            timeout: 60000
        })

        await elemento.click()
    }


    // ==========================================
    // FLUXO DE CADASTRO
    // ==========================================

    async createAccount(
        firstName,
        lastName,
        phoneNumber,
        email,
        password,
        repassword
    ) {

        // Abre tela de cadastro
        await this.clicar(this.btnSignUp)

        // Aguarda o formulário aparecer
        await this.firstName.waitForDisplayed({
            timeout: 60000
        })

        // Preenche os campos
        await this.preencher(
            this.firstName,
            firstName
        )

        await this.preencher(
            this.lastName,
            lastName
        )

        await this.preencher(
            this.phoneNumber,
            phoneNumber
        )

        await this.preencher(
            this.email,
            email
        )

        await this.preencher(
            this.password,
            password
        )

        await this.preencher(
            this.repassword,
            repassword
        )

        // Esconde teclado
        await this.esconderTeclado()

        // Cria conta
        await this.clicar(
            this.btnCreate
        )

        // Wishlist
        await this.clicar(
            this.wishlist
        )

        // Voltar
        await this.clicar(
            this.back
        )
    }
}

export default new CadastroPage()