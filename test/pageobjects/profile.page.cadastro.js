import { $ } from '@wdio/globals'

class ProfilePageCadastro {
    async profileNameCadastro(name) {
        return $(`//android.widget.TextView[@text="${name}"]`);
    }
}
export default new ProfilePageCadastro();