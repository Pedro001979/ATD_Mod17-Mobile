import { expect } from '@wdio/globals'
import cadastroPage from '../pageobjects/cadastro.page.js'

describe('Cadastro de usuário', () => {
    it('deve cadastrar um usuário com sucesso', async () => {
        const email = `user${Date.now()}@example.com`
        await cadastroPage.createAccount(
            'John',
            'Silva',
            '11987654321',
            email,
            '123456',
            '123456'
        )

       await expect($('//android.widget.TextView[@text="Silva John"]')).toBeDisplayed()
    })
})