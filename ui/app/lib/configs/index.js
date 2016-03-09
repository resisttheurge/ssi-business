import angular from 'angular'
import routeConfig from './route.config'

import ssiConstants from 'constants'

export default
  angular
    .module('ssi.configs.old', [ssiConstants.name])
    .config(routeConfig)
