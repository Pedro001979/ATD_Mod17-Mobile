import { $ } from '@wdio/globals'

class ProfilePageLogin {

    profileNameLogin(name) {
        return $(`android=new UiSelector().text("${name}")`);
    }

}

export default new ProfilePageLogin();