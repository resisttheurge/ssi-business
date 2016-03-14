import { Service } from 'common'

export default class $ssiSettings extends Service {

  /*@ngInject*/
  constructor($mdSidenav) {
    super()
    this.$mdSidenav = $mdSidenav
  }

  get $sidenav() {
    return this.$mdSidenav('settings-sidenav')
  }

  toggle() {
    return this.$sidenav.toggle()
  }

}
