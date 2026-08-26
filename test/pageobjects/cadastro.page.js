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
    // BOTÃO CREATE
    // ============================================================
    //
    // NÃO usamos ~Create.
    //
    // Também não usamos:
    //
    // //android.widget.Button[@text="Create"]
    //
    // porque o último Actions mostrou que esse elemento não existe.
    //
    // Como ainda não temos o Page Source da tela de cadastro,
    // usamos um seletor mais abrangente procurando "Create"
    // independentemente da classe do elemento.
    //
    // ============================================================

    get createButton() {
        return $('//*[contains(@text, "Create")]')
    }

    // ============================================================
    // MÉTODO AUXILIAR
    // Espera um elemento aparecer
    // ============================================================

    async waitForElement(element, description, timeout = 30000) {

        await element.waitForDisplayed({
            timeout,
            timeoutMsg: `${description} não apareceu após ${timeout}ms.`
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

            console.log('✓ Teclado já estava fechado.')

        }
    }

    // ============================================================
    // ROLAR A TELA
    // ============================================================

    async scrollUp() {

        try {

            const scrollView = $('//android.widget.ScrollView')

            const exists = await scrollView.isExisting()

            if (!exists) {
                console.log('ℹ ScrollView não encontrado. Continuando sem scroll.')
                return
            }

            await driver.execute('mobile: scrollGesture', {
                elementId: await scrollView.elementId,
                direction: 'up',
                percent: 0.8
            })

            await driver.pause(500)

            console.log('✓ Scroll executado.')

        } catch (error) {

            console.log('ℹ Não foi possível executar o scroll.')
            console.log('ℹ Continuando o teste para localizar o Create.')

        }
    }

    // ============================================================
    // DIAGNÓSTICO DA TELA
    // ============================================================
    //
    // Se o Create não for encontrado, imprimimos informações
    // importantes dos elementos da tela.
    //
    // Isso evita ficar chutando seletores.
    //
    // ============================================================

    async printCreateCandidates() {

        console.log('')
        console.log('========================================')
        console.log('DIAGNÓSTICO DOS ELEMENTOS DA TELA')
        console.log('========================================')

        try {

            const elements = await $$(
                '//*[@text or @content-desc or @resource-id]'
            )

            console.log(
                `Total de elementos analisados: ${elements.length}`
            )

            for (const element of elements) {

                try {

                    const text = await element.getAttribute('text')
                    const contentDesc =
                        await element.getAttribute('content-desc')
                    const resourceId =
                        await element.getAttribute('resource-id')
                    const className =
                        await element.getAttribute('className')

                    const textValue = text || ''
                    const descValue = contentDesc || ''
                    const resourceValue = resourceId || ''

                    const isCreate =
                        textValue.toLowerCase().includes('create') ||
                        descValue.toLowerCase().includes('create') ||
                        resourceValue.toLowerCase().includes('create')

                    if (isCreate) {

                        console.log('----------------------------------------')

                        console.log({
                            text: textValue,
                            contentDesc: descValue,
                            resourceId: resourceValue,
                            className: className || ''
                        })

                        console.log('----------------------------------------')
                    }

                } catch (error) {

                    // Ignora elementos que desapareçam durante a leitura

                }
            }

        } catch (error) {

            console.log(
                'Não foi possível analisar os candidatos ao Create.'
            )

            console.log(error.message)

        }

        console.log('========================================')
        console.log('FIM DO DIAGNÓSTICO')
        console.log('========================================')
        console.log('')
    }

    // ============================================================
    // CAPTURAR PAGE SOURCE
    // ============================================================

    async printPageSource() {

        try {

            console.log('')
            console.log('========================================')
            console.log('PAGE SOURCE - TELA DE CADASTRO')
            console.log('========================================')

            const pageSource = await driver.getPageSource()

            console.log(pageSource)

            console.log('========================================')
            console.log('FIM PAGE SOURCE')
            console.log('========================================')
            console.log('')

        } catch (error) {

            console.log(
                'Não foi possível capturar o Page Source.'
            )

            console.log(error.message)

        }
    }

    // ============================================================
    // LOCALIZAR CREATE
    // ============================================================

    async findCreateButton() {

        // --------------------------------------------------------
        // PRIMEIRA TENTATIVA
        // text contendo Create
        // --------------------------------------------------------

        const createByText = $('//*[contains(@text, "Create")]')

        if (await createByText.isExisting()) {

            console.log('✓ Create encontrado através do atributo text.')

            return createByText
        }

        // --------------------------------------------------------
        // SEGUNDA TENTATIVA
        // content-desc contendo Create
        // --------------------------------------------------------

        const createByDescription = $(
            '//*[contains(@content-desc, "Create")]'
        )

        if (await createByDescription.isExisting()) {

            console.log(
                '✓ Create encontrado através do content-desc.'
            )

            return createByDescription
        }

        // --------------------------------------------------------
        // TERCEIRA TENTATIVA
        // resource-id contendo create
        // --------------------------------------------------------

        const createByResourceId = $(
            '//*[contains(@resource-id, "create")]'
        )

        if (await createByResourceId.isExisting()) {

            console.log(
                '✓ Create encontrado através do resource-id.'
            )

            return createByResourceId
        }

        // --------------------------------------------------------
        // NÃO ENCONTROU
        // --------------------------------------------------------

        console.log(
            '❌ Nenhum elemento Create encontrado.'
        )

        await this.printCreateCandidates()
        await this.printPageSource()

        throw new Error(
            'Botão Create não foi encontrado na tela. ' +
            'Consulte o Page Source e o diagnóstico acima.'
        )
    }

    // ============================================================
    // FLUXO COMPLETO DE CADASTRO
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
        console.log('')

        // ========================================================
        // 1. PROFILE
        // ========================================================

        await this.waitForElement(
            this.btnProfile,
            'Botão Profile',
            60000
        )

        await this.btnProfile.click()

        console.log('✓ Profile aberto.')

        // ========================================================
        // 2. SIGN UP
        // ========================================================

        await this.waitForElement(
            this.btnSignUp,
            'Botão Sign up',
            30000
        )

        await this.btnSignUp.click()

        console.log('✓ Tela de cadastro aberta.')

        // ========================================================
        // 3. PRIMEIRO NOME
        // ========================================================

        await this.waitForElement(
            this.firstName,
            'Campo firstName'
        )

        await this.firstName.setValue(firstName)

        console.log('✓ Primeiro nome preenchido.')

        // ========================================================
        // 4. SOBRENOME
        // ========================================================

        await this.waitForElement(
            this.lastName,
            'Campo lastName'
        )

        await this.lastName.setValue(lastName)

        console.log('✓ Sobrenome preenchido.')

        // ========================================================
        // 5. TELEFONE
        // ========================================================

        await this.waitForElement(
            this.phoneNumber,
            'Campo phone'
        )

        await this.phoneNumber.setValue(phoneNumber)

        console.log('✓ Telefone preenchido.')

        // ========================================================
        // 6. EMAIL
        // ========================================================

        await this.waitForElement(
            this.email,
            'Campo email'
        )

        await this.email.setValue(email)

        console.log('✓ Email preenchido.')

        // ========================================================
        // 7. SENHA
        // ========================================================

        await this.waitForElement(
            this.password,
            'Campo password'
        )

        await this.password.setValue(password)

        console.log('✓ Senha preenchida.')

        // ========================================================
        // 8. CONFIRMAÇÃO DA SENHA
        // ========================================================

        await this.waitForElement(
            this.repassword,
            'Campo repassword'
        )

        await this.repassword.setValue(repassword)

        console.log('✓ Confirmação da senha preenchida.')

        // ========================================================
        // 9. FECHAR TECLADO
        // ========================================================

        await this.hideKeyboard()

        await driver.pause(500)

        // ========================================================
        // 10. CAPTURAR A TELA ANTES DO CREATE
        // ========================================================
        //
        // Isso é proposital.
        //
        // Se o Create falhar novamente, teremos no Actions
        // exatamente o que o Appium está enxergando.
        //
        // ========================================================

        await this.printCreateCandidates()

        // ========================================================
        // 11. TENTAR SCROLL
        // ========================================================

        await this.scrollUp()

        // ========================================================
        // 12. PROCURAR CREATE
        // ========================================================

        const createButton = await this.findCreateButton()

        // ========================================================
        // 13. ESPERAR CREATE FICAR VISÍVEL
        // ========================================================

        await this.waitForElement(
            createButton,
            'Botão Create',
            15000
        )

        console.log('✓ Botão Create está visível.')

        // ========================================================
        // 14. CLICAR UMA ÚNICA VEZ
        // ========================================================

        await createButton.click()

        console.log('✓ Botão Create clicado.')

        // ========================================================
        // 15. AGUARDAR PROCESSAMENTO
        // ========================================================

        await driver.pause(1000)

        console.log('')
        console.log('========================================')
        console.log('CADASTRO ENVIADO COM SUCESSO')
        console.log('========================================')
        console.log('')
    }
}

export default new CadastroPage()