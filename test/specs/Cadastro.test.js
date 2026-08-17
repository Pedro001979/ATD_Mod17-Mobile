import { expect } from '@wdio/globals'
import homePageCadastro from '../pageobjects/home.page.cadastro.js'
import cadastroPage from '../pageobjects/cadastro.page.js'
import profilePageCadastro from '../pageobjects/profile.page.cadastro.js'

describe('Cadastro de usuário', () => {
    it('deve cadastrar um usuário com sucesso', async () => {
        const email = `user${Date.now()}@example.com`

        try {
            // Abre o menu
            await homePageCadastro.openMenuCadastro('profile')

            // Faz o cadastro
            await cadastroPage.createAccount(
                'John',
                'Silva',
                '11987654321',
                email,
                '123456',
                '123456'
            )

            // Valida resultado
            const profileElement = profilePageCadastro.profileNameCadastro('Silva John')
            await expect(profileElement).toBeDisplayed({ timeout: 10000 })
        } catch (e) {
            console.log('Erro no teste:', e.message)
            throw e
        }
    })
})
