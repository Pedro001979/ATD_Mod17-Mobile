import { expect } from '@wdio/globals'
import homePageCadastro from '../pageobjects/home.page.cadastro.js'
import cadastroPage from '../pageobjects/cadastro.page.js'
import profilePageCadastro from '../pageobjects/profile.page.cadastro.js'

describe('Cadastro de usuário', () => {
    it('deve cadastrar um usuário com sucesso', async () => {
        const email = `user${Date.now()}@example.com`

        // 1. Abre a aba Profile apenas uma vez no início
        await homePageCadastro.openMenuCadastro('profile')

        // 2. Executa o cadastro completo
        await cadastroPage.createAccount(
            'John',
            'Silva',
            '11987654321',
            email,
            '123456',
            '123456'
        )

        // 3. chamada repetida do openMenuCadastro aqui!
         await homePageCadastro.openMenuCadastro('profile')
        // 4. Mapeia e valida a exibição do nome do perfil
        const profile = profilePageCadastro.profileNameCadastro('Silva John')

        await profile.waitForDisplayed({
            timeout: 30000
        })

        // Corrige a asserção usando o expect nativo do WebdriverIO
        await expect(profile).toBeDisplayed()
    })
})