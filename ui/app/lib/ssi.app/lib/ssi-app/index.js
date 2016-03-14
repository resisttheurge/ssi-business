import { Controller } from 'common'

import templateUrl from './template'

class ssiApp extends Controller {

  /*@ngInject*/
  constructor($ssiApp) {
    super()
    this.$service = $ssiApp
  }

  toggleNavigation() {
    return this.$service.toggleNavigation()
  }

  toggleSettings() {
    return this.$service.toggleSettings()
  }

}

export default {
  templateUrl,
  controller: ssiApp,
  controllerAs: '$app'
}
