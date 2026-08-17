import { $, driver } from '@wdio/globals'

class CadastroPage {
    // 1. Locators - Usando várias estratégias
    get btnSignUp() { 
        return $('android=new UiSelector().resourceIdMatches(".*sign.*up").type(android.widget.Button)') 
    }
    
    get firstName() { 
        return $('android=new UiSelector().resourceIdMatches(".*firstName").type(android.widget.EditText)') 
    }
    
    get lastName() { 
        return $('android=new UiSelector().resourceIdMatches(".*lastName").type(android.widget.EditText)') 
    }
    
    get phoneNumber() { 
        return $('android=new UiSelector().resourceIdMatches(".*phone").type(android.widget.EditText)') 
    }
    
    get email() { 
        return $('android=new UiSelector().resourceIdMatches(".*email").type(android.widget.EditText)') 
    }
    
    get password() { 
        return $('android=new UiSelector().resourceIdMatches(".*password").type(android.widget.EditText)') 
    }
    
    get repassword() { 
        return $('android=new UiSelector().resourceIdMatches(".*confirm.*password").type(android.widget.EditText)') 
    }
    
    get btnCreate() { 
        return $('android=new UiSelector().resourceIdMatches(".*create").type(android.widget.Button)') 
    }

    // 2. Helpers
    async preencher(elemento, valor) {
        try {
            await elemento.waitForDisplayed({ timeout: 10000 })
            await elemento.clearValue()
            await elemento.setValue(valor)
        } catch (e) {
            console.log(`Erro ao preencher elemento: ${e.message}`)
            throw e
        }
    }

    async esconderTeclado() {
        try {
            if (await driver.isKeyboardShown()) {
                await driver.hideKeyboard()
            }
        } catch (e) {
            console.log(`Erro ao esconder teclado: ${e.message}`)
        }
    }

    async clicar(elemento, nome = 'elemento') {
        try {
            await elemento.waitForDisplayed({ timeout: 10000 })
            await elemento.click()
        } catch (e) {
            console.log(`Erro ao clicar em ${nome}: ${e.message}`)
            throw e
        }
    }

    // 3. Fluxo Principal
    async createAccount(firstName, lastName, phoneNumber, email, password, repassword) {
        console.log('Iniciando cadastro...')
        
        await this.clicar(this.btnSignUp, 'Sign Up')
        await driver.pause(2000) // Aguardar tela carregar

        await this.preencher(this.firstName, firstName)
        await driver.pause(500)
        
        await this.preencher(this.lastName, lastName)
        await driver.pause(500)
        
        await this.preencher(this.phoneNumber, phoneNumber)
        await driver.pause(500)
        
        await this.preencher(this.email, email)
        await driver.pause(500)
        
        await this.preencher(this.password, password)
        await driver.pause(500)
        
        await this.preencher(this.repassword, repassword)
        await driver.pause(500)

        await this.esconderTeclado()
        await driver.pause(1000)

        await this.clicar(this.btnCreate, 'Create Button')
        console.log('Cadastro realizado com sucesso!')
    }
}

export default new CadastroPage()