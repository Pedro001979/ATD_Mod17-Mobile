class LoginPage {

    get email() {
        return $('id=email');
    }

    get password() {
        return $('id=password');
    }

    get loginButton() {
        return $('id=login');
    }

    async login(email, password) {

        await this.email.waitForDisplayed({
            timeout: 30000
        });

        await this.email.setValue(email);

        await this.password.waitForDisplayed({
            timeout: 30000
        });

        await this.password.setValue(password);

        await this.loginButton.waitForDisplayed({
            timeout: 30000
        });

        await this.loginButton.click();
    }
}

export default new LoginPage();