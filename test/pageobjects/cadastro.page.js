import { $, driver } from '@wdio/globals'

class CadastroPage {
    // Mapeamento simplificado usando atalho id: e XPath curto
    get btnprofile() { return $('~Profile') } // busca por texto
    get btnsingUp() { return $('~Sign up') }
    get firstName() { return $('id=firstName') }
    get lastName() { return $('id=lastName') }
    get phoneNumber() { return $('id=phone') }
    get email() { return $('id=email') }
    get password() { return $('id=password') }
    get repassword() { return $('id=repassword') }
    get btnCreate() { return $('~Create') } // busca por resourceId
    get btnwishlist() { return $('id=wishlist') } // busca por resourceId
    get btnback() { return $('id=back') } // busca por content-desc
    get btnprofile() { return $('~Profile') } // busca por texto


    // Fluxo com passo a passo direto por linha
    async createAccount(firstName, lastName, phoneNumber, email, password, repassword) {
        await waitForDisplayed(this.btnprofile)
        await this.btnprofile.click()
        await waitForDisplayed(this.btnsingUp)
        await this.btnsingUp.click()
        await waitForDisplayed(this.firstName)
        await this.firstName.setValue(firstName)
        await waitForDisplayed(this.lastName)
        await this.lastName.setValue(lastName)
        await waitForDisplayed(this.phoneNumber)
        await this.phoneNumber.setValue(phoneNumber)
        await waitForDisplayed(this.email)
        await this.email.setValue(email)
        await waitForDisplayed(this.password)
        await this.password.setValue(password)
        await waitForDisplayed(this.repassword)
        await this.repassword.setValue(repassword)
        await waitForDisplayed(this.btnCreate)
        await this.btnCreate.click()
        await waitForDisplayed(this.btnwishlist)
        await this.btnwishlist.click()
        await waitForDisplayed(this.btnback)
        await this.btnback.click()
        await waitForDisplayed(this.btnprofile)
        await this.btnprofile.click()
    }
}

export default new CadastroPage()