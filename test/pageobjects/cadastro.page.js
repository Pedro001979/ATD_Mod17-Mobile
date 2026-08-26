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
    // CONTAINERS
    // ============================================================

    get scrollView() {
        return $('//android.widget.ScrollView')
    }

    // ============================================================
    // BOTÃO CREATE
    // ============================================================
    //
    // NÃO assumimos que Create é Button.
    //
    // O último Actions mostrou que:
    //
    // //android.widget.Button[@text="Create"]
    //
    // NÃO existe.
    //
    // Também não usamos:
    //
    // ~Create
    //
    // porque accessibility-id="Create" também não foi encontrado.
    //
    // O método findCreateButton() abaixo faz a descoberta.
    // ============================================================

    get createByText() {
        return $('//*[contains(translate(@text, "CREATE", "create"), "create")]')
    }

    get createByContentDescription() {
        return $('//*[contains(translate(@content-desc, "CREATE", "create"), "create")]')
    }

    get createByResourceId() {
        return $('//*[contains(translate(@resource-id, "CREATE", "create"), "create")]')
    }

    // ============================================================
    // ESPERAR ELEMENTO
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
    // SCROLL
    // ============================================================

    async scrollUp() {

        try {

            const scrollView = this.scrollView

            if (!(await scrollView.isExisting())) {

                console.log(
                    'ℹ ScrollView não encontrado. Continuando sem scroll.'
                )

                return false
            }

            if (!(await scrollView.isDisplayed())) {

                console.log(
                    'ℹ ScrollView não está visível. Continuando sem scroll.'
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

            await driver.pause(500)

            console.log(`ℹ Resultado do scroll: ${result}`)

            if (result === false) {

                console.log(
                    'ℹ A tela não possui mais conteúdo para rolar.'
                )

                return false
            }

            console.log('✓ Scroll executado.')

            return true

        } catch (error) {

            console.log('ℹ Scroll não pôde ser executado.')
            console.log(`ℹ Motivo: ${error.message}`)

            return false
        }
    }

    // ============================================================
    // DIAGNÓSTICO DOS ELEMENTOS CREATE
    // ============================================================

    async printCreateCandidates() {

        console.log('')
        console.log('==============================================')
        console.log('🔎 DIAGNÓSTICO DO BOTÃO CREATE')
        console.log('==============================================')

        try {

            const elements = await $$(
                '//*[@text or @content-desc or @resource-id]'
            )

            console.log(
                `Elementos encontrados na tela: ${elements.length}`
            )

            let candidatesFound = 0

            for (const element of elements) {

                try {

                    const text =
                        (await element.getAttribute('text')) || ''

                    const contentDesc =
                        (await element.getAttribute('content-desc')) || ''

                    const resourceId =
                        (await element.getAttribute('resource-id')) || ''

                    const className =
                        (await element.getAttribute('className')) || ''

                    const clickable =
                        (await element.getAttribute('clickable')) || ''

                    const enabled =
                        (await element.getAttribute('enabled')) || ''

                    const textLower =
                        text.toLowerCase()

                    const descLower =
                        contentDesc.toLowerCase()

                    const resourceLower =
                        resourceId.toLowerCase()

                    const isCreate =
                        textLower.includes('create') ||
                        descLower.includes('create') ||
                        resourceLower.includes('create')

                    if (!isCreate) {
                        continue
                    }

                    candidatesFound++

                    console.log('')
                    console.log('------------- CANDIDATO CREATE -------------')

                    console.log({
                        text,
                        contentDesc,
                        resourceId,
                        className,
                        clickable,
                        enabled
                    })

                    console.log(
                        '---------------------------------------------'
                    )

                } catch (error) {

                    // Elemento pode ter desaparecido durante a leitura.

                }
            }

            if (candidatesFound === 0) {

                console.log('')
                console.log(
                    '❌ Nenhum elemento contendo "Create" foi encontrado.'
                )

            } else {

                console.log('')
                console.log(
                    `✓ ${candidatesFound} possível(is) elemento(s) Create encontrado(s).`
                )
            }

        } catch (error) {

            console.log(
                '❌ Falha ao executar diagnóstico do Create.'
            )

            console.log(error.message)
        }

        console.log('==============================================')
        console.log('🔎 FIM DO DIAGNÓSTICO CREATE')
        console.log('==============================================')
        console.log('')
    }

    // ============================================================
    // DIAGNÓSTICO DOS ELEMENTOS CLICÁVEIS
    // ============================================================

    async printClickableElements() {

        console.log('')
        console.log('==============================================')
        console.log('🖱️ ELEMENTOS CLICÁVEIS DA TELA')
        console.log('==============================================')

        try {

            const elements = await $$(
                '//*[@clickable="true"]'
            )

            console.log(
                `Elementos clicáveis encontrados: ${elements.length}`
            )

            for (const element of elements) {

                try {

                    const text =
                        (await element.getAttribute('text')) || ''

                    const contentDesc =
                        (await element.getAttribute('content-desc')) || ''

                    const resourceId =
                        (await element.getAttribute('resource-id')) || ''

                    const className =
                        (await element.getAttribute('className')) || ''

                    const enabled =
                        (await element.getAttribute('enabled')) || ''

                    console.log({
                        text,
                        contentDesc,
                        resourceId,
                        className,
                        enabled
                    })

                } catch (error) {

                    // Ignora elementos que desapareçam durante o diagnóstico.

                }
            }

        } catch (error) {

            console.log(
                '❌ Não foi possível obter os elementos clicáveis.'
            )

            console.log(error.message)
        }

        console.log('==============================================')
        console.log('🖱️ FIM DOS ELEMENTOS CLICÁVEIS')
        console.log('==============================================')
        console.log('')
    }

    // ============================================================
    // PAGE SOURCE
    // ============================================================

    async printPageSource() {

        try {

            console.log('')
            console.log('==============================================')
            console.log('📱 PAGE SOURCE - TELA DE CADASTRO')
            console.log('==============================================')

            const pageSource =
                await driver.getPageSource()

            console.log(pageSource)

            console.log('==============================================')
            console.log('📱 FIM PAGE SOURCE')
            console.log('==============================================')
            console.log('')

        } catch (error) {

            console.log(
                '❌ Não foi possível capturar o Page Source.'
            )

            console.log(error.message)
        }
    }

    // ============================================================
    // LOCALIZAR CREATE
    // ============================================================

    async findCreateButton() {

        console.log('')
        console.log('==============================================')
        console.log('🔎 PROCURANDO BOTÃO CREATE')
        console.log('==============================================')

        // --------------------------------------------------------
        // 1. TEXT
        // --------------------------------------------------------

        try {

            if (await this.createByText.isExisting()) {

                console.log(
                    '✓ Create encontrado através do atributo text.'
                )

                return this.createByText
            }

        } catch (error) {

            console.log(
                'ℹ Falha na busca por text.'
            )
        }

        // --------------------------------------------------------
        // 2. CONTENT-DESC
        // --------------------------------------------------------

        try {

            if (await this.createByContentDescription.isExisting()) {

                console.log(
                    '✓ Create encontrado através do content-desc.'
                )

                return this.createByContentDescription
            }

        } catch (error) {

            console.log(
                'ℹ Falha na busca por content-desc.'
            )
        }

        // --------------------------------------------------------
        // 3. RESOURCE-ID
        // --------------------------------------------------------

        try {

            if (await this.createByResourceId.isExisting()) {

                console.log(
                    '✓ Create encontrado através do resource-id.'
                )

                return this.createByResourceId
            }

        } catch (error) {

            console.log(
                'ℹ Falha na busca por resource-id.'
            )
        }

        // --------------------------------------------------------
        // 4. DIAGNÓSTICOS
        // --------------------------------------------------------

        console.log('')
        console.log(
            '❌ Create não foi encontrado pelos seletores conhecidos.'
        )

        await this.printCreateCandidates()

        await this.printClickableElements()

        await this.printPageSource()

        // --------------------------------------------------------
        // ERRO FINAL
        // --------------------------------------------------------

        throw new Error(
            'Botão Create não foi encontrado na árvore de elementos ' +
            'da tela de cadastro. O Page Source completo foi impresso ' +
            'no log do GitHub Actions.'
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
        console.log('==============================================')
        console.log('🚀 INÍCIO DO CADASTRO')
        console.log('==============================================')
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

        await driver.pause(1000)

        console.log('✓ Tela preparada para localizar Create.')

        // ========================================================
        // 10. DIAGNÓSTICO ANTES DO SCROLL
        // ========================================================

        await this.printCreateCandidates()

        // ========================================================
        // 11. TENTAR SCROLL
        // ========================================================

        await this.scrollUp()

        // ========================================================
        // 12. AGUARDAR EVENTUAL ATUALIZAÇÃO DA UI
        // ========================================================

        await driver.pause(1000)

        // ========================================================
        // 13. PROCURAR CREATE
        // ========================================================

        const createButton =
            await this.findCreateButton()

        // ========================================================
        // 14. GARANTIR QUE ESTÁ VISÍVEL
        // ========================================================

        await this.waitForElement(
            createButton,
            'Botão Create',
            15000
        )

        console.log('✓ Botão Create está visível.')

        // ========================================================
        // 15. GARANTIR QUE ESTÁ HABILITADO
        // ========================================================

        const enabled =
            await createButton.getAttribute('enabled')

        console.log(
            `ℹ Estado enabled do Create: ${enabled}`
        )

        if (enabled === 'false') {

            throw new Error(
                'O botão Create existe, mas está DESABILITADO.'
            )
        }

        // ========================================================
        // 16. CLICAR UMA ÚNICA VEZ
        // ========================================================

        await createButton.click()

        console.log('✓ Botão Create clicado.')

        // ========================================================
        // 17. AGUARDAR PROCESSAMENTO
        // ========================================================

        await driver.pause(1500)

        console.log('')
        console.log('==============================================')
        console.log('✅ CADASTRO ENVIADO')
        console.log('==============================================')
        console.log('')
    }
}

export default new CadastroPage()