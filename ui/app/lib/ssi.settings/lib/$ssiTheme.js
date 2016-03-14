import { Service } from 'common'

export default class $ssiTheme extends Service {

  /*@ngInject*/
  constructor() {
    super()
    this.dark = false
  }

  toggle() {
    this.dark = !this.dark
  }

  get id() {
    return this.dark ?
      'default-dark'
    : 'default'
  }

  get label() {
    return this.dark ?
      'Dark Theme'
    : 'Light Theme'
  }

  get icon() {
    return this.dark ?
      'brightness_3'
    : 'brightness_5'
  }

}
