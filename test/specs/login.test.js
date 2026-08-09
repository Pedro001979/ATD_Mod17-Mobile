import { expect, driver } from '@wdio/globals'
import homePage from '../pageobjects/home.page.js'
import loginPage from '../pageobjects/login.page.js'
import profilePageLogin from '../pageobjects/profile.page.login.js'

describe('My Login application', () => {

    it('should login with valid credentials', async () => {

        await homePage.openMenu('profile');

        await loginPage.login(
            'cliente@ebac.art.br',
            'GD*peToHNJ1#c$sgk08EaYJQ'
        );

        await homePage.openMenu('profile')
        const profile = profilePageLogin.profileNameLogin('EBAC Cliente')
         await profile.waitForDisplayed({
            timeout: 30000
        })

        // Corrige a asserção usando o expect nativo do WebdriverIO
        await expect(profile).toBeDisplayed()

    })
})