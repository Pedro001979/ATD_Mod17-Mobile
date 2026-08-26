import { expect, driver } from '@wdio/globals'
import LoginPage from '../pageobjects/login.page.js'

describe('Login functionality', () => {
    it('should login with valid credentials', async () => {
        await LoginPage.login(
            'cliente@ebac.art.br',
            'GD*peToHNJ1#c$sgk08EaYJQ'
        );
        await expect($('//android.widget.TextView[@text="EBAC Cliente"]')).toBeDisplayed()
    });
});