import { Service } from 'common'

export default class $ssiNavigation extends Service {

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
