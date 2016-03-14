import { AbstractController } from 'utils'

import templateUrl from './template'

class AppController extends AbstractController {

  /*@ngInject*/
  constructor($ssiApp, $ssiUser, $ssiSelected, $ssiTheme) {
    super()
    this.$service = $ssiApp
    this.$theme = $ssiTheme
    this.selected = $ssiSelected
    this.user = $ssiUser
  }

  toggleNavigation() {
    return this.$service.toggleNavigation()
  }

  toggleSettings() {
    return this.$service.toggleSettings()
  }

  get theme() {
    return this.$theme.theme
  }

}

export default {
  templateUrl,
  controller: AppController,
  controllerAs: '$app'
}
