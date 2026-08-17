import { $, driver } from '@wdio/globals'

class CadastroPage {

    // ==========================================
    // LOCATORS
    // ==========================================

    get btnSignUp() {
        return $('android=new UiSelector().text("Sign up")')
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
    // CAMPO DO FORMULÁRIO
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

    async esperar(elemento, nome, timeout = 60000) {
        await elemento.waitForDisplayed({
            timeout,
            timeoutMsg: `Elemento "${nome}" não ficou visível após ${timeout}ms.`
        })

        return elemento
    }

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

        // Aguarda o formulário aparecer
        await this.esperar(
            this.campoEditText(0),
            'firstName'
        )

        // Os índices são baseados somente nos EditText do formulário.
        // O UiScrollable garante que o campo seja trazido para a tela.
        await this.preencherCampo(0, firstName, 'firstName')
        await this.preencherCampo(1, lastName, 'lastName')
        await this.preencherCampo(2, phoneNumber, 'phoneNumber')
        await this.preencherCampo(3, email, 'email')
        await this.preencherCampo(4, password, 'password')
        await this.preencherCampo(5, repassword, 'repassword')

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
