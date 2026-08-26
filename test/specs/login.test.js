import { expect, driver } from '@wdio/globals'
import loginPage from '../test/pageobjects/login.page.js'

describe('My Login application', () => {

    it('should login with valid credentials', async () => {

        await loginPage.login(
            'cliente@ebac.art.br',
            'GD*peToHNJ1#c$sgk08EaYJQ'
        );

    })
})