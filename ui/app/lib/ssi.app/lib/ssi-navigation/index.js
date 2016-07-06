import { AbstractController } from 'utils'

import templateUrl from './template'

class NavigationController extends AbstractController {

  /*@ngInject*/
  constructor($ssiNavigation, $ssiSelected, $ssiUser) {
    super()
    this.$service = $ssiNavigation
    this.selected = $ssiSelected
    this.user = $ssiUser
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
