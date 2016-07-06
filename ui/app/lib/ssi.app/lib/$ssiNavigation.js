import { AbstractService } from 'utils'

export default class $ssiNavigation extends AbstractService {

  /*@ngInject*/
  constructor($mdSidenav) {
    super()
    this.$mdSidenav = $mdSidenav
  }

  get $sidenav() {
    return this.$mdSidenav('navigation-sidenav')
  }

  toggle() {
    return this.$sidenav.toggle()
  }

}
