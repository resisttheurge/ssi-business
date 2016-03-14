import angular from 'angular'

import $ssiSettings from '$ssiSettings'
import ssiSettings from 'ssi-settings'

export default
  angular.module('ssi.settings', [])
    .service('$ssiSettings', $ssiSettings)
    .component('ssiSettings', ssiSettings)
    .name
