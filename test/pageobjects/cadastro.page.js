import { $, driver } from '@wdio/globals'

class CadastroPage {
    // Locators simples usando XPath
    get btnSignUp() { 
        return $('//android.widget.Button[contains(@text, "sign")]') 
    }
    
    get firstName() { 
        return $('//android.widget.EditText[1]') 
    }
    
    get lastName() { 
        return $('//android.widget.EditText[2]') 
    }
    
    get phoneNumber() { 
        return $('//android.widget.EditText[3]') 
    }
    
    get email() { 
        return $('//android.widget.EditText[4]') 
    }
    
    get password() { 
        return $('//android.widget.EditText[5]') 
    }
    
    get repassword() { 
        return $('//android.widget.EditText[6]') 
    }
    
    get btnCreate() { 
        return $('//android.widget.Button[contains(@text, "Create")]') 
    }

    // Métodos simples
    async clicar(elemento) {
        await driver.pause(1000)
        await elemento.click()
    }

    async preencher(elemento, valor) {
        await driver.pause(1000)
        await elemento.setValue(valor)
    }

    async esconderTeclado() {
        try {
            await driver.hideKeyboard()
        } catch (e) {
            // Ignora
        }
    }

    // Fluxo
    async createAccount(firstName, lastName, phoneNumber, email, password, repassword) {
        try {
            await this.clicar(this.btnSignUp)
            await this.preencher(this.firstName, firstName)
            await this.preencher(this.lastName, lastName)
            await this.preencher(this.phoneNumber, phoneNumber)
            await this.preencher(this.email, email)
            await this.preencher(this.password, password)
            await this.preencher(this.repassword, repassword)
            await this.esconderTeclado()
            await this.clicar(this.btnCreate)
        } catch (e) {
            console.log('Erro no cadastro:', e.message)
            throw e
        }
    }
}

export default new CadastroPage()
