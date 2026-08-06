import { $ } from '@wdio/globals'

class ProfilePageCadastro {

    profileNameCadastro(nome) {

        return $(`//android.widget.TextView[@text="${nome}"]`)

    }

}

export default new ProfilePageCadastro()