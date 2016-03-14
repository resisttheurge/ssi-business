import { Controller } from 'common'

import templateUrl from './template'

class NavigationController extends Controller {

  /*@ngInject*/
  constructor($ssiNavigation) {
    super()
    this.$service = $ssiNavigation
  }

  toggle() {
    return this.$service.toggle()
  }

}

export default {
  templateUrl,
  controller: NavigationController,
  controllerAs: '$navigation'
}
