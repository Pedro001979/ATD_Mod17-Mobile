import { $, $$, driver } from '@wdio/globals'

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
    // CAMPOS DO FORMULÁRIO
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
    // SCROLL VIEW
    // ============================================================

    get formScrollView() {
        return $('//android.widget.ScrollView')
    }

    // ============================================================
    // POSSÍVEIS LOCALIZADORES DO CREATE
    // ============================================================

    get createByText() {
        return $(
            '//*[contains(translate(@text,"CREATE","create"),"create")]'
        )
    }

    get createByContentDescription() {
        return $(
            '//*[contains(translate(@content-desc,"CREATE","create"),"create")]'
        )
    }

    get createByResourceId() {
        return $(
            '//*[contains(translate(@resource-id,"CREATE","create"),"create")]'
        )
    }

    // ============================================================
    // ESPERAR ELEMENTO
    // ============================================================

    async waitForElement(element, description, timeout = 30000) {

        await element.waitForDisplayed({
            timeout,
            timeoutMsg:
                `${description} não apareceu após ${timeout}ms.`
        })

        return element
    }

    // ============================================================
    // FECHAR TECLADO
    // ============================================================

    async hideKeyboard() {

        try {

            await driver.hideKeyboard()

            console.log('✓ Teclado fechado.')

        } catch (error) {

            console.log(
                'ℹ Teclado já estava fechado.'
            )
        }
    }

    // ============================================================
    // ROLAR FORMULÁRIO
    // ============================================================

    async scrollToBottom() {

        try {

            const scrollView = this.formScrollView

            if (!(await scrollView.isExisting())) {

                console.log(
                    'ℹ ScrollView não encontrado.'
                )

                return false
            }

            if (!(await scrollView.isDisplayed())) {

                console.log(
                    'ℹ ScrollView não está visível.'
                )

                return false
            }

            const result = await driver.execute(
                'mobile: scrollGesture',
                {
                    elementId: await scrollView.elementId,
                    direction: 'up',
                    percent: 0.8
                }
            )

            await driver.pause(700)

            console.log(
                `ℹ Resultado do scroll: ${result}`
            )

            return result

        } catch (error) {

            console.log(
                'ℹ Não foi possível executar o scroll.'
            )

            console.log(
                `ℹ Motivo: ${error.message}`
            )

            return false
        }
    }

    // ============================================================
    // DIAGNÓSTICO DE ELEMENTOS
    // ============================================================

    async diagnoseScreen() {

        console.log('')
        console.log('================================================')
        console.log('🔎 DIAGNÓSTICO DA TELA DE CADASTRO')
        console.log('================================================')

        try {

            const elements = await $$(
                '//*[@text or @content-desc or @resource-id]'
            )

            console.log(
                `Total de elementos encontrados: ${elements.length}`
            )

            for (const element of elements) {

                try {

                    const text =
                        (await element.getAttribute('text')) || ''

                    const contentDesc =
                        (await element.getAttribute(
                            'content-desc'
                        )) || ''

                    const resourceId =
                        (await element.getAttribute(
                            'resource-id'
                        )) || ''

                    const className =
                        (await element.getAttribute(
                            'className'
                        )) || ''

                    const clickable =
                        (await element.getAttribute(
                            'clickable'
                        )) || ''

                    const enabled =
                        (await element.getAttribute(
                            'enabled'
                        )) || ''

                    const visible =
                        (await element.getAttribute(
                            'displayed'
                        )) || ''

                    const normalized =
                        `${text} ${contentDesc} ${resourceId}`
                            .toLowerCase()

                    if (
                        normalized.includes('create') ||
                        clickable === 'true'
                    ) {

                        console.log({
                            text,
                            contentDesc,
                            resourceId,
                            className,
                            clickable,
                            enabled,
                            visible
                        })
                    }

                } catch (error) {
                    // Elemento pode desaparecer durante a leitura.
                }
            }

        } catch (error) {

            console.log(
                '❌ Falha ao analisar os elementos da tela.'
            )

            console.log(error.message)
        }

        console.log('================================================')
        console.log('🔎 FIM DO DIAGNÓSTICO')
        console.log('================================================')
        console.log('')
    }

    // ============================================================
    // PAGE SOURCE
    // ============================================================

    async printPageSource() {

        try {

            console.log('')
            console.log('================================================')
            console.log('📱 PAGE SOURCE ATUAL')
            console.log('================================================')

            const source =
                await driver.getPageSource()

            console.log(source)

            console.log('================================================')
            console.log('📱 FIM PAGE SOURCE')
            console.log('================================================')
            console.log('')

        } catch (error) {

            console.log(
                '❌ Não foi possível obter o Page Source.'
            )

            console.log(error.message)
        }
    }

    // ============================================================
    // LOCALIZAR CREATE
    // ============================================================

    async findCreateButton() {

        console.log('')
        console.log('🔎 Procurando botão Create...')

        // --------------------------------------------------------
        // 1. TEXT
        // --------------------------------------------------------

        try {

            const element = this.createByText

            if (await element.isExisting()) {

                console.log(
                    '✓ Create encontrado pelo atributo text.'
                )

                return element
            }

        } catch (error) {

            console.log(
                'ℹ Busca por text falhou.'
            )
        }

        // --------------------------------------------------------
        // 2. CONTENT-DESC
        // --------------------------------------------------------

        try {

            const element =
                this.createByContentDescription

            if (await element.isExisting()) {

                console.log(
                    '✓ Create encontrado pelo content-desc.'
                )

                return element
            }

        } catch (error) {

            console.log(
                'ℹ Busca por content-desc falhou.'
            )
        }

        // --------------------------------------------------------
        // 3. RESOURCE-ID
        // --------------------------------------------------------

        try {

            const element =
                this.createByResourceId

            if (await element.isExisting()) {

                console.log(
                    '✓ Create encontrado pelo resource-id.'
                )

                return element
            }

        } catch (error) {

            console.log(
                'ℹ Busca por resource-id falhou.'
            )
        }

        // --------------------------------------------------------
        // 4. DIAGNÓSTICO
        // --------------------------------------------------------

        console.log('')
        console.log(
            '❌ Create não foi encontrado.'
        )

        await this.diagnoseScreen()

        await this.printPageSource()

        throw new Error(
            'O botão Create não está disponível na árvore de UI ' +
            'do Appium nesta etapa do cadastro.'
        )
    }

    // ============================================================
    // ABRIR PROFILE
    // ============================================================

    async openProfile() {

        await this.waitForElement(
            this.btnProfile,
            'Botão Profile',
            60000
        )

        await this.btnProfile.click()

        console.log('✓ Profile aberto.')
    }

    // ============================================================
    // ABRIR SIGN UP
    // ============================================================

    async openSignUp() {

        await this.waitForElement(
            this.btnSignUp,
            'Botão Sign up',
            30000
        )

        await this.btnSignUp.click()

        console.log('✓ Tela de cadastro aberta.')
    }

    // ============================================================
    // PREENCHER PRIMEIRO NOME
    // ============================================================

    async fillFirstName(value) {

        await this.waitForElement(
            this.firstName,
            'Campo firstName'
        )

        await this.firstName.setValue(value)

        console.log('✓ Primeiro nome preenchido.')
    }

    // ============================================================
    // PREENCHER SOBRENOME
    // ============================================================

    async fillLastName(value) {

        await this.waitForElement(
            this.lastName,
            'Campo lastName'
        )

        await this.lastName.setValue(value)

        console.log('✓ Sobrenome preenchido.')
    }

    // ============================================================
    // PREENCHER TELEFONE
    // ============================================================

    async fillPhone(value) {

        await this.waitForElement(
            this.phoneNumber,
            'Campo phone'
        )

        await this.phoneNumber.setValue(value)

        console.log('✓ Telefone preenchido.')
    }

    // ============================================================
    // PREENCHER EMAIL
    // ============================================================

    async fillEmail(value) {

        await this.waitForElement(
            this.email,
            'Campo email'
        )

        await this.email.setValue(value)

        console.log('✓ Email preenchido.')
    }

    // ============================================================
    // PREENCHER SENHA
    // ============================================================

    async fillPassword(value) {

        await this.waitForElement(
            this.password,
            'Campo password'
        )

        await this.password.setValue(value)

        console.log('✓ Senha preenchida.')
    }

    // ============================================================
    // PREENCHER CONFIRMAÇÃO
    // ============================================================

    async fillRepassword(value) {

        await this.waitForElement(
            this.repassword,
            'Campo repassword'
        )

        await this.repassword.setValue(value)

        console.log(
            '✓ Confirmação da senha preenchida.'
        )
    }

    // ============================================================
    // VALIDAR FORMULÁRIO
    // ============================================================

    async validateFormFields() {

        console.log('')
        console.log(
            '🔎 Validando campos do formulário...'
        )

        const fields = [
            {
                element: this.firstName,
                name: 'firstName'
            },
            {
                element: this.lastName,
                name: 'lastName'
            },
            {
                element: this.phoneNumber,
                name: 'phone'
            },
            {
                element: this.email,
                name: 'email'
            },
            {
                element: this.password,
                name: 'password'
            },
            {
                element: this.repassword,
                name: 'repassword'
            }
        ]

        for (const field of fields) {

            const exists =
                await field.element.isExisting()

            if (!exists) {

                throw new Error(
                    `Campo ${field.name} não existe.`
                )
            }

            const displayed =
                await field.element.isDisplayed()

            if (!displayed) {

                throw new Error(
                    `Campo ${field.name} não está visível.`
                )
            }

            console.log(
                `✓ ${field.name} OK`
            )
        }

        console.log(
            '✓ Todos os campos do formulário estão OK.'
        )
    }

    // ============================================================
    // CRIAR CONTA
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
        console.log('================================================')
        console.log('🚀 INÍCIO DO FLUXO DE CADASTRO')
        console.log('================================================')
        console.log('')

        // ========================================================
        // 1. PROFILE
        // ========================================================

        await this.openProfile()

        // ========================================================
        // 2. SIGN UP
        // ========================================================

        await this.openSignUp()

        // ========================================================
        // 3. PRIMEIRO NOME
        // ========================================================

        await this.fillFirstName(firstName)

        // ========================================================
        // 4. SOBRENOME
        // ========================================================

        await this.fillLastName(lastName)

        // ========================================================
        // 5. TELEFONE
        // ========================================================

        await this.fillPhone(phoneNumber)

        // ========================================================
        // 6. EMAIL
        // ========================================================

        await this.fillEmail(email)

        // ========================================================
        // 7. SENHA
        // ========================================================

        await this.fillPassword(password)

        // ========================================================
        // 8. CONFIRMAÇÃO
        // ========================================================

        await this.fillRepassword(repassword)

        // ========================================================
        // 9. FECHAR TECLADO
        // ========================================================

        await this.hideKeyboard()

        await driver.pause(1000)

        console.log(
            '✓ Formulário preenchido.'
        )

        // ========================================================
        // 10. VALIDAR TODOS OS CAMPOS
        // ========================================================

        await this.validateFormFields()

        // ========================================================
        // 11. DIAGNÓSTICO ANTES DO SCROLL
        // ========================================================

        console.log('')
        console.log(
            '🔎 Verificando Create antes do scroll...'
        )

        let createButton = null

        try {

            createButton =
                await this.findCreateButton()

        } catch (error) {

            console.log(
                'ℹ Create ainda não foi encontrado antes do scroll.'
            )
        }

        // ========================================================
        // 12. SCROLL
        // ========================================================

        if (!createButton) {

            console.log(
                '🔄 Tentando rolar até o final do formulário...'
            )

            await this.scrollToBottom()

            await driver.pause(1000)
        }

        // ========================================================
        // 13. TENTAR ENCONTRAR NOVAMENTE
        // ========================================================

        if (!createButton) {

            console.log(
                '🔎 Procurando Create novamente após scroll...'
            )

            createButton =
                await this.findCreateButton()
        }

        // ========================================================
        // 14. GARANTIR VISIBILIDADE
        // ========================================================

        await this.waitForElement(
            createButton,
            'Botão Create',
            15000
        )

        console.log(
            '✓ Botão Create está visível.'
        )

        // ========================================================
        // 15. VALIDAR HABILITADO
        // ========================================================

        const enabled =
            await createButton.getAttribute('enabled')

        console.log(
            `ℹ Create enabled: ${enabled}`
        )

        if (enabled === 'false') {

            await this.diagnoseScreen()

            throw new Error(
                'O botão Create existe, mas está desabilitado.'
            )
        }

        // ========================================================
        // 16. CLICAR
        // ========================================================

        await createButton.click()

        console.log(
            '✓ Botão Create clicado.'
        )

        // ========================================================
        // 17. AGUARDAR APLICAÇÃO
        // ========================================================

        await driver.pause(1500)

        console.log('')
        console.log('================================================')
        console.log('✅ FLUXO DE CADASTRO FINALIZADO')
        console.log('================================================')
        console.log('')
    }
}

export default new CadastroPage()