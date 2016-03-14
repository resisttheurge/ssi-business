import angular from 'angular'

import endpoint from './endpoint'
import enums from './enums'
import routes from './routes'

export default
  angular
    .module('ssi.constants.old', [])
    .constant('endpoint', endpoint)
    .constant('enums', enums)
    .constant('routes', routes)
