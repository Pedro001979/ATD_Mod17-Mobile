import { expect } from '@wdio/globals'
import HomePageCadastro from '../pageobjects/home.page.cadastro.js'
import cadastroPage from '../pageobjects/cadastro.page.js'
import profilePageCadastro from '../pageobjects/profile.page.cadastro.js'

describe('Cadastro de usuário', () => {
    it('deve cadastrar um usuário com sucesso', async () => {
        const email = `user${Date.now()}@example.com`

        await HomePageCadastro.openMenuCadastro('profile')

        await cadastroPage.createAccount(
            'John',
            'Silva',
            '11987654321',
            email,
            '123456',
            '123456'
        )

        await expect(
            profilePageCadastro.profileNameCadastro('Silva John')
        ).toBeDisplayed({ timeout: 10000 })
    })
})