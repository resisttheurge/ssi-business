import { AbstractService } from 'utils'

export default class $ssiSettings extends AbstractService {

  /*@ngInject*/
  constructor($mdSidenav, $ssiTheme) {
    super()
    this.$mdSidenav = $mdSidenav
    this.$theme = $ssiTheme
  }

  get $sidenav() {
    return this.$mdSidenav('settings-sidenav')
  }

  get toggleThemeIcon() {
    return this.$theme.toggleIcon
  }

  get toggleThemeLabel() {
    return this.$theme.toggleLabel
  }

  toggle() {
    return this.$sidenav.toggle()
  }

  toggleTheme() {
    return this.$theme.toggle()
  }

}
