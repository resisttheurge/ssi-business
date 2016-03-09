import angular from 'angular'

import $ssiSelected from './$ssiSelected'
import $ssiUser from './$ssiUser'

export default
  angular
    .module('ssi.services.state.old', [])
    .service('$ssiSelected', $ssiSelected)
    .service('$ssiUser', $ssiUser)
