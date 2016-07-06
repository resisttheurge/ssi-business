import { AbstractController } from 'utils'

import templateUrl from './template'

class SettingsController extends AbstractController {

  /*@ngInject*/
  constructor($ssiSettings) {
    super()
    this.$service = $ssiSettings
  }

  get toggleThemeIcon() {
    return this.$service.toggleThemeIcon
  }

  get toggleThemeLabel() {
    return this.$service.toggleThemeLabel
  }

  toggle() {
    return this.$service.toggle()
  }

  toggleTheme() {
    return this.$service.toggleTheme()
  }

}

export default {
  templateUrl,
  controller: SettingsController,
  controllerAs: '$settings'
}
