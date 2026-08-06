import { expect } from '@wdio/globals'

import homePageCadastro from '../pageobjects/home.page.cadastro.js'

import cadastroPage from '../pageobjects/cadastro.page.js'

import profilePageCadastro from '../pageobjects/profile.page.cadastro.js'

describe('Cadastro de usuário', () => {

    it('deve cadastrar um usuário com sucesso', async () => {

        const email = `user${Date.now()}@example.com`

        await homePageCadastro.openMenuCadastro('profile')

        await cadastroPage.createAccount(
            'John',
            'Silva',
            '11987654321',
            email,
            '123456',
            '123456'
        )

        await homePageCadastro.openMenuCadastro('profile')

        const profile =
            profilePageCadastro.profileNameCadastro('Silva John')

        await profile.waitForDisplayed({
            timeout: 30000
        })

        await expect(profile).toBeDisplayed()

    })

})