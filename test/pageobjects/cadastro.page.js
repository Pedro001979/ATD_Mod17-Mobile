import { $, driver } from '@wdio/globals'

class CadastroPage {
    // Mapeamento simplificado usando atalho id: e XPath curto
    get btnprofile() { return $('//android.view.View[@content-desc=", Profile"]') } // busca por texto
    get btnsingU() { return $('//android.view.ViewGroup[@content-desc="Sign up"]') }
    get firstName() { return $('//android.widget.EditText[@resource-id="firstName"]') }
    get lastName() { return $('//android.widget.EditText[@resource-id="lastName"]') }
    get phoneNumber() { return $('//android.widget.EditText[@resource-id="phone"]') }
    get email() { return $('//android.widget.EditText[@resource-id="email"]') }
    get password() { return $('//android.widget.EditText[@resource-id="password"]') }
    get repassword() { return $('//android.widget.EditText[@resource-id="repassword"]') }
    get btnCreate() { return $('//android.view.ViewGroup[@content-desc="Create"]') } // busca por resourceId
    get btnwishlist() { return $('//android.widget.TextView[@resource-id="wishlist"]') } // busca por resourceId
    get btnback() { return $('//android.view.ViewGroup[@content-desc=""]') } // busca por content-desc
    get btnprofile() { return $('//android.view.View[@content-desc=", Profile"]') } // busca por texto


    // Fluxo com passo a passo direto por linha
    async createAccount(firstName, lastName, phoneNumber, email, password, repassword) {
        await driver.pause(20000) // Pausa para garantir que a tela de carregue
        await this.btnprofile.click()
        await driver.pause(10000) // Pausa para garantir que a tela de carregue
        await this.btnSignUp.click()
        await driver.pause(10000) // Pausa para garantir que a tela de carregue
        await this.firstName.setValue(firstName)
        await driver.pause(5000) // Pausa para garantir que a tela de carregue
        await this.btnprofile.click()
        await this.lastName.setValue(lastName)
        await driver.pause(5000) // Pausa para garantir que a tela de carregue
        await this.btnprofile.click()
        await this.phoneNumber.setValue(phoneNumber)
        await driver.pause(5000) // Pausa para garantir que a tela de carregue
        await this.btnprofile.click()
        await this.email.setValue(email)
        await driver.pause(5000) // Pausa para garantir que a tela de carregue
        await this.btnprofile.click()
        await this.password.setValue(password)
        await driver.pause(5000) // Pausa para garantir que a tela de carregue
        await this.btnprofile.click()
        await this.repassword.setValue(repassword)
        await driver.pause(5000) // Pausa para garantir que a tela de carregue
        await this.btnprofile.click()
        await driver.pause(5000) // Pausa para garantir que a tela de carregue
        await this.btnCreate.click()
        await driver.pause(10000) // Pausa para garantir que a tela de carregue
        await this.btnwishlist.click()
        await driver.pause(10000) // Pausa para garantir que a tela de carregue
        await this.btnback.click()
        await driver.pause(10000) // Pausa para garantir que a tela de carregue
        await this.btnprofile.click()

    }
}

export default new CadastroPage()