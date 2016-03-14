import angular from 'angular'

import $ssiApp from '$ssiApp'
import $ssiNavigation from '$ssiNavigation'
import $ssiSettings from '$ssiSettings'
import $ssiTheme from '$ssiTheme'

import ssiApp from 'ssi-app'
import ssiNavigation from 'ssi-navigation'
import ssiSettings from 'ssi-settings'

import themeConfig from 'theme.config'

export default
  angular.module('ssi.app', [])

    .service('$ssiApp', $ssiApp)
    .service('$ssiNavigation', $ssiNavigation)
    .service('$ssiSettings', $ssiSettings)
    .service('$ssiTheme', $ssiTheme)

    .component('ssiApp', ssiApp)
    .component('ssiNavigation', ssiNavigation)
    .component('ssiSettings', ssiSettings)

    .config(themeConfig)

    .name
