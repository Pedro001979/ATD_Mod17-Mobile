import { $, driver } from '@wdio/globals'

class CadastroPage {
    // Mapeamento simplificado usando atalho id: e XPath curto
    get btnprofile() { return $('//android.widget.TextView[@resource-id="tab-profile"]') } // busca por texto
    get btnsingUp() { return $('//android.widget.TextView[@text="Sign up"]') }
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