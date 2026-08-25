import { $, driver } from '@wdio/globals'

class CadastroPage {
    // Mapeamento simplificado usando atalho id: e XPath curto
    get btnprofile() { return $('//android.widget.TextView[@resource-id="tab-profile"]'); } // busca por texto
    get btnsingUp() { return $('//android.widget.TextView[@text="Sign up"]'); }
    get firstName() { return $('//android.widget.EditText[@resource-id="firstName"]'); }
    get lastName() { return $('//android.widget.EditText[@resource-id="lastName"]'); }
    get phoneNumber() { return $('//android.widget.EditText[@resource-id="phone"]'); }
    get email() { return $('//android.widget.EditText[@resource-id="email"]'); }
    get password() { return $('//android.widget.EditText[@resource-id="password"]'); }
    get repassword() { return $('//android.widget.EditText[@resource-id="repassword"]'); }
    get createButton() {
        return $('id=create');
    }
    get btnwishlist() { return $('//android.widget.TextView[@resource-id="wishlist"]') } // busca por resourceId
    get btnback() { return $('//android.widget.TextView[@text=""]') } // busca por content-desc


    // Fluxo com passo a passo direto por linha
    async createAccount(firstName, lastName, phoneNumber, email, password, repassword) {
        await this.btnprofile.waitForDisplayed({
            timeout: 60000
        })

        await this.btnprofile.click()

        console.log('========================================')
        console.log('PAGE SOURCE APÓS CLICAR NO PROFILE')
        console.log('========================================')

        const source = await driver.getPageSource()

        console.log(source)

        console.log('========================================')
        console.log('FIM PAGE SOURCE')
        console.log('========================================')

        await this.btnsingUp.waitForDisplayed({
            timeout: 30000,
            timeoutMsg: 'Sign up não apareceu'
        })

        await this.btnsingUp.click()

        await this.btnsingUp.click()
        await this.firstName.setValue(firstName)
        await this.lastName.setValue(lastName)
        await this.phoneNumber.setValue(phoneNumber)
        await this.email.setValue(email)
        await this.password.setValue(password)
        await this.repassword.setValue(repassword)
        try {
            await browser.hideKeyboard();
        } catch (error) {
            console.log('Teclado já estava fechado.');
        }

        await browser.pause(500);

        const scrollView = $('//android.widget.ScrollView');

        await scrollView.waitForDisplayed({
            timeout: 5000
        });

        await scrollView.scrollIntoView({
            direction: 'down'
        });

        await browser.pause(500);
        await this.createButton.click();
        await this.btnCreate.click()
        await this.btnwishlist.click()
        await this.btnback.click()
    }
}
export default new CadastroPage()