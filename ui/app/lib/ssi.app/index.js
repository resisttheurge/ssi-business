import angular from 'angular'

import $ssiApp from '$ssiApp'
import ssiApp from 'ssi-app'

export default
  angular.module('ssi.app', [])
    .service('$ssiApp', $ssiApp)
    .component('ssiApp', ssiApp)
    .value('$routerRootComponent', 'ssiApp')
    .name
