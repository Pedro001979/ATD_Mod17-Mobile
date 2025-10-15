import { expect, driver } from '@wdio/globals'
import homePageCadastro from '../pageobjects/home.page.cadastro.js'
import cadastroPage from '../pageobjects/cadastro.page.js'
import profilePageCadastro from '../pageobjects/profile.page.cadastro.js'
const email = `user${Math.floor(Math.random() * 100000)}@example.com`
describe('My Login application', () => {
    it('should login with valid credentials', async () => {
        await homePageCadastro.openMenuCadastro('profile')
        await cadastroPage.createAccount('John', 'Silva', '11987654321', email, '123456', '123456')
        await homePageCadastro.openMenuCadastro('profile')
        expect((await profilePageCadastro.profileNameCadastro('Silva John')).isDisplayed()).toBeTruthy()
        await driver.pause(1000)
    })
})

