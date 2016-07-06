import { AbstractService } from 'utils'

export default class $ssiApp extends AbstractService {

  /*@ngInject*/
  constructor($ssiNavigation, $ssiSettings) {
    super()
    this.$navigation = $ssiNavigation
    this.$settings = $ssiSettings
  }

  toggleNavigation() {
    return this.$navigation.toggle()
  }

  toggleSettings() {
    return this.$settings.toggle()
  }

}
