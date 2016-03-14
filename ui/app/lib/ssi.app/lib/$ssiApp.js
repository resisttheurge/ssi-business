import { Service } from 'common'

export default class $ssiApp extends Service {

  /*@ngInject*/
  constructor($ssiNavigation, $ssiSettings) {
    super()
    this.$navigation = $ssiNavigation
    this.$settings = $ssiSettings
  }

  toggleNavigation() {
    this.$navigation.toggle()
  }

  toggleSettings() {
    this.$settings.toggle()
  }

}
