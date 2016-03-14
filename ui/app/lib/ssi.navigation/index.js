import angular from 'angular'

import $ssiNavigation from '$ssiNavigation'
import ssiNavigation from 'ssi-navigation'

export default
  angular.module('ssi.navigation', [])
    .service('$ssiNavigation', $ssiNavigation)
    .component('ssiNavigation', ssiNavigation)
    .name
