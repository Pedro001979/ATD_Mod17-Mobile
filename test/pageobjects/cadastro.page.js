import { $, driver } from '@wdio/globals'

class CadastroPage {
    // Mapeamento simplificado usando atalho id: e XPath curto
    get btnprofile() { return $('//android.widget.TextView[@resource-id="tab-profile"]') } // busca por texto
    get btnsingUp() { return $('//android.view.ViewGroup[@content-desc="Sign up"]') }
    get firstName() { return $('new UiSelector().resourceId("firstName")') }
    get lastName() { return $('new UiSelector().resourceId("lastName")') }
    get phoneNumber() { return $('new UiSelector().resourceId("phone")') }
    get email() { return $('new UiSelector().resourceId("email")') }
    get password() { return $('new UiSelector().resourceId("password")') }
    get repassword() { return $('new UiSelector().resourceId("repassword")') }
    get btnCreate() { return $('~Create') } // busca por resourceId
    get btnwishlist() { return $('id=wishlist') } // busca por resourceId
    get btnback() { return $('id=back') } // busca por content-desc


    // Fluxo com passo a passo direto por linha
    async createAccount(firstName, lastName, phoneNumber, email, password, repassword) {
        await this.btnprofile.click()
        await this.btnsingUp.click()
        await this.firstName.setValue(firstName)
        await this.lastName.setValue(lastName)
        await this.phoneNumber.setValue(phoneNumber)
        await this.email.setValue(email)
        await this.password.setValue(password)
        await this.repassword.setValue(repassword)
        await this.btnCreate.click()
        await this.btnwishlist.click()
        await this.btnback.click()
        await this.btnprofile.click()
    }
}

export default new CadastroPage()