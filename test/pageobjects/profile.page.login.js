import { $ } from '@wdio/globals'

class ProfilePageLogin {
    async profileNameLogin(name) {
        return $(`//android.widget.TextView[@text="${name}"]`);
    }
}
export default new ProfilePageLogin();