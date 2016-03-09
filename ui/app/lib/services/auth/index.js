import angular from 'angular'

import $ssiAuth from './$ssiAuth'

export default
  angular
    .module('ssi.services.auth.old', [])
    .service('$ssiAuth', $ssiAuth)
