import { Controller } from 'common'

import templateUrl from './template'

class ssiSettings extends Controller {

  /*@ngInject*/
  constructor($ssiSettings) {
    super()
    this.$service = $ssiSettings
  }

  toggle() {
    return this.$service.toggle()
  }

}

export default {
  templateUrl,
  controller: ssiSettings,
  controllerAs: '$settings'
}
