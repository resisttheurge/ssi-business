import angular from 'angular'

import endpoint from './endpoint'
import enums from './enums'
import routes from './routes'
import routeValidation from './routeValidation'

export default
  angular
    .module('ssi.constants.old', [])
    .constant('endpoint', endpoint)
    .constant('enums', enums)
    .constant('routes', routes)
    .constant('routeValidation', routeValidation)
