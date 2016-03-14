import { AbstractService } from 'utils'

export default class $ssiTheme extends AbstractService {

  /*@ngInject*/
  constructor() {
    super()
    this.$theme = 'default'
    this.$dark = false
  }

  toggle() {
    this.$dark = !this.$dark
  }

  get theme() {
    return this.$dark ?
      `${this.$theme}-dark`
    : this.$theme
  }

  get toggleLabel() {
    return this.$dark ?
      'Switch to Light Theme'
    : 'Switch to Dark Theme'
  }

  get toggleIcon() {
    return this.$dark ?
      'brightness_5'
    : 'brightness_3'
  }

}
