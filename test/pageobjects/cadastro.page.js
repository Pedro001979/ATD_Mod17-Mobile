import { $, driver } from '@wdio/globals'

class CadastroPage {

    // ==========================================
    // LOCATORS
    // ==========================================

    get btnSignUp() {
        return $('android=new UiSelector().text("Sign up")')
    }

    // Use case-insensitive match for Create (Inspector shows "Create")
    get btnCreate() {
        return $('android=new UiSelector().textMatches("(?i)create")')
    }

    get wishlist() {
        return $('android=new UiSelector().resourceIdMatches(".*:id/wishlist")')
    }

    get back() {
        return $('android=new UiSelector().resourceIdMatches(".*:id/back")')
    }

    // Explicit, stable selectors for form fields using resourceIdMatches (works even if package differs)
    get inputFirstName() {
        return $('android=new UiSelector().resourceIdMatches(".*:id/firstName")')
    }

    get inputLastName() {
        return $('android=new UiSelector().resourceIdMatches(".*:id/lastName")')
    }

    get inputPhoneNumber() {
        return $('android=new UiSelector().resourceIdMatches(".*:id/phoneNumber")')
    }

    get inputEmail() {
        return $('android=new UiSelector().resourceIdMatches(".*:id/email")')
    }

    get inputPassword() {
        return $('android=new UiSelector().resourceIdMatches(".*:id/password")')
    }

    get inputRepassword() {
        return $('android=new UiSelector().resourceIdMatches(".*:id/repassword")')
    }

    // ==========================================
    // CAMPO DO FORMULÁRIO (legacy scroll-by-index kept for fallback)
    // ==========================================

    campoEditText(indice) {
        // O formulário é rolável e nem todos os EditText ficam
        // presentes na hierarquia visível ao mesmo tempo.
        // UiScrollable força o Android a rolar até o campo.
        return $(`android=new UiScrollable(new UiSelector().scrollable(true)).scrollIntoView(new UiSelector().className("android.widget.EditText").instance(${indice}))`)
    }

    // ==========================================
    // HELPERS
    // ==========================================

    async esperar(elemento, nome, timeout = 90000) {
        await elemento.waitForDisplayed({
            timeout,
            timeoutMsg: `Elemento "${nome}" não ficou visível após ${timeout}ms.`
        })

        return elemento
    }

    // preencher por elemento (mais estável que usar índice)
    async preencherCampoElemento(elemento, valor, nome) {
        await this.esperar(elemento, nome)

        await elemento.click()
        await elemento.clearValue()
        await elemento.setValue(valor)

        // O teclado reduz a área visível e pode impedir que o próximo
        // campo seja encontrado. Escondemos antes de continuar.
        await this.esconderTeclado()
    }

    // Mantido para compatibilidade com código antigo
    async preencherCampo(indice, valor, nome) {
        const campo = this.campoEditText(indice)

        await this.esperar(campo, nome)

        await campo.click()
        await campo.clearValue()
        await campo.setValue(valor)

        // O teclado reduz a área visível e pode impedir que o próximo
        // campo seja encontrado. Escondemos antes de continuar.
        await this.esconderTeclado()
    }

    async esconderTeclado() {
        try {
            if (await driver.isKeyboardShown()) {
                await driver.hideKeyboard()
                await driver.pause(300)
            }
        } catch {
            // O teclado pode já estar fechado.
        }
    }

    async clicar(elemento, nome) {
        await this.esperar(elemento, nome)
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
        await this.clicar(this.btnSignUp, 'Sign up')

        // Aguarda o primeiro campo aparecer usando selector por resource-id
        await this.esperar(
            this.inputFirstName,
            'firstName'
        )

        // Preenche campos usando selectors estáveis (resourceIdMatches)
        await this.preencherCampoElemento(this.inputFirstName, firstName, 'firstName')
        await this.preencherCampoElemento(this.inputLastName, lastName, 'lastName')
        await this.preencherCampoElemento(this.inputPhoneNumber, phoneNumber, 'phoneNumber')
        await this.preencherCampoElemento(this.inputEmail, email, 'email')
        await this.preencherCampoElemento(this.inputPassword, password, 'password')
        await this.preencherCampoElemento(this.inputRepassword, repassword, 'repassword')

        await this.esconderTeclado()

        // Cria conta
        await this.clicar(this.btnCreate, 'create')

        // Wishlist
        await this.clicar(this.wishlist, 'wishlist')

        // Voltar
        await this.clicar(this.back, 'back')
    }
}

export default new CadastroPage()
