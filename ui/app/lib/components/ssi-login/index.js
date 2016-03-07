import './styles'
import templateUrl from './template'

export const ssiLogin = {
  name: 'ssiLogin',
  config: {
    templateUrl,
    bindings: {

    },
    controller: class ssiLoginController {
      constructor() {

      }
    }
  }
}

export default ssiLogin.name
