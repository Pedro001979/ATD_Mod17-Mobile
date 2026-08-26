import { $, driver } from '@wdio/globals'

class CadastroPage {

    // ============================================================
    // TELA DE PERFIL
    // ============================================================

    get btnProfile() {
        return $('//android.widget.TextView[@resource-id="tab-profile"]')
    }

    get btnSignUp() {
        return $('//android.widget.TextView[@text="Sign up"]')
    }

    // ============================================================
    // CAMPOS DO FORMULÁRIO DE CADASTRO
    // ============================================================

    get firstName() {
        return $('//android.widget.EditText[@resource-id="firstName"]')
    }

    get lastName() {
        return $('//android.widget.EditText[@resource-id="lastName"]')
    }

    get phoneNumber() {
        return $('//android.widget.EditText[@resource-id="phone"]')
    }

    get email() {
        return $('//android.widget.EditText[@resource-id="email"]')
    }

    get password() {
        return $('//android.widget.EditText[@resource-id="password"]')
    }

    get repassword() {
        return $('//android.widget.EditText[@resource-id="repassword"]')
    }

    // ============================================================
    // SCROLL DO FORMULÁRIO
    // ============================================================

    get formScrollView() {
        return $('//android.widget.ScrollView')
    }

    // ============================================================
    // BOTÃO CREATE
    // ============================================================
    //
    // IMPORTANTE:
    // O seletor antigo era:
    //
    // $('~Create')
    //
    // Isso significa ACCESSIBILITY ID.
    //
    // No último Actions, o Appium procurou:
    //
    // findElement("accessibility id", "Create")
    //
    // e não encontrou.
    //
    // Por enquanto usamos TEXT.
    // Se o próximo Page Source mostrar um resource-id real
    // para o botão, vamos trocar por ele.
    //
    // ============================================================

    get createButton() {
        return $('//android.widget.Button[@text="Create"]')
    }

    // ============================================================
    // FECHAR TECLADO
    // ============================================================

    async hideKeyboard() {
        try {
            await driver.hideKeyboard()
        } catch (error) {
            console.log('Teclado já estava fechado.')
        }
    }

    // ============================================================
    // ROLAR FORMULÁRIO
    // ============================================================

    async scrollToCreateButton() {

        await this.formScrollView.waitForDisplayed({
            timeout: 10000,
            timeoutMsg: 'ScrollView do formulário não apareceu.'
        })

        await driver.execute('mobile: scrollGesture', {
            elementId: await this.formScrollView.elementId,
            direction: 'up',
            percent: 0.8
        })

        await driver.pause(500)
    }

    // ============================================================
    // CADASTRAR USUÁRIO
    // ============================================================

    async createAccount(
        firstName,
        lastName,
        phoneNumber,
        email,
        password,
        repassword
    ) {

        console.log('')
        console.log('========================================')
        console.log('INÍCIO DO FLUXO DE CADASTRO')
        console.log('========================================')

        // ========================================================
        // 1. ABRIR PROFILE
        // ========================================================

        await this.btnProfile.waitForDisplayed({
            timeout: 60000,
            timeoutMsg: 'Botão Profile não apareceu.'
        })

        await this.btnProfile.click()

        console.log('✓ Profile aberto.')

        // ========================================================
        // 2. ABRIR SIGN UP
        // ========================================================

        await this.btnSignUp.waitForDisplayed({
            timeout: 30000,
            timeoutMsg: 'Botão Sign up não apareceu após abrir o Profile.'
        })

        await this.btnSignUp.click()

        console.log('✓ Tela de cadastro aberta.')

        // ========================================================
        // 3. PRIMEIRO NOME
        // ========================================================

        await this.firstName.waitForDisplayed({
            timeout: 30000,
            timeoutMsg: 'Campo firstName não apareceu.'
        })

        await this.firstName.setValue(firstName)

        console.log('✓ Primeiro nome preenchido.')

        // ========================================================
        // 4. SOBRENOME
        // ========================================================

        await this.lastName.waitForDisplayed({
            timeout: 30000,
            timeoutMsg: 'Campo lastName não apareceu.'
        })

        await this.lastName.setValue(lastName)

        console.log('✓ Sobrenome preenchido.')

        // ========================================================
        // 5. TELEFONE
        // ========================================================

        await this.phoneNumber.waitForDisplayed({
            timeout: 30000,
            timeoutMsg: 'Campo phone não apareceu.'
        })

        await this.phoneNumber.setValue(phoneNumber)

        console.log('✓ Telefone preenchido.')

        // ========================================================
        // 6. EMAIL
        // ========================================================

        await this.email.waitForDisplayed({
            timeout: 30000,
            timeoutMsg: 'Campo email não apareceu.'
        })

        await this.email.setValue(email)

        console.log('✓ Email preenchido.')

        // ========================================================
        // 7. SENHA
        // ========================================================

        await this.password.waitForDisplayed({
            timeout: 30000,
            timeoutMsg: 'Campo password não apareceu.'
        })

        await this.password.setValue(password)

        console.log('✓ Senha preenchida.')

        // ========================================================
        // 8. CONFIRMAÇÃO DA SENHA
        // ========================================================

        await this.repassword.waitForDisplayed({
            timeout: 30000,
            timeoutMsg: 'Campo repassword não apareceu.'
        })

        await this.repassword.setValue(repassword)

        console.log('✓ Confirmação da senha preenchida.')

        // ========================================================
        // 9. FECHAR TECLADO
        // ========================================================

        await this.hideKeyboard()

        await driver.pause(500)

        console.log('✓ Teclado fechado.')

        // ========================================================
        // 10. ROLAR ATÉ O BOTÃO CREATE
        // ========================================================

        await this.scrollToCreateButton()

        console.log('✓ Formulário rolado.')

        // ========================================================
        // 11. LOCALIZAR CREATE
        // ========================================================

        await this.createButton.waitForDisplayed({
            timeout: 15000,
            timeoutMsg:
                'Botão Create não apareceu após rolar o formulário.'
        })

        console.log('✓ Botão Create encontrado.')

        // ========================================================
        // 12. CLICAR NO CREATE
        // ========================================================

        await this.createButton.click()

        console.log('✓ Botão Create clicado.')

        // Pequena espera para a aplicação processar o cadastro
        await driver.pause(1000)

        console.log('')
        console.log('========================================')
        console.log('FIM DO FLUXO DE CADASTRO')
        console.log('========================================')
        console.log('')
    }
}

export default new CadastroPage()