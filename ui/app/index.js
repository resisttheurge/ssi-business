// angular itself
import angular from 'angular'

// angular material peer dependencies
import ngAnimate from 'angular-animate'
import ngAria from 'angular-aria'
import ngMessages from 'angular-messages'

// angular material dependencies
import ngMaterial from 'angular-material'
import ngMaterialDataTable from 'angular-material-data-table'

// angular material global styles
import ngMaterialStyles from 'angular-material/angular-material.scss'
import ngMaterialDataTableStyles from 'angular-material-data-table/dist/md-data-table.css'

// routing dependencies
// import ngComponentRouter from '@angular/router/angular1/angular_1_router.js'

import ngRoute from 'angular-route'

// Restangular for api services
// import Restangular from 'restangular'
import ngResource from 'angular-resource'

//
// create the module
//

// import sub modules
import modules from 'modules'

// create the module from its external and sub-module dependencies,
// then return its name so it can be imported similarly by dependent modules
export const ssi =
  angular.module('ssi', [

    // angular material peer dependencies
    ngAnimate,
    ngAria,
    ngMessages,

    // angular material dependencies
    ngMaterial,
    ngMaterialDataTable,

    // routing dependencies
    // ngComponentRouter,
    ngRoute,

    // api dependencies
    // Restangular,
    ngResource,

    // sub module dependencies
    ...modules
  ])

//
// configure the module
//

// import utilities
import { bundle } from 'utils/ng'

// import configurations
import animations from 'animations'
import components from 'components'
import configs from 'configs'
import constants from 'constants'
import controllers from 'controllers'
import decorators from 'decorators'
import directives from 'directives'
import factories from 'factories'
import filters from 'filters'
import providers from 'providers'
import scripts from 'scripts'
import services from 'services'
import values from 'values'

// run the configurations
angular.module(ssi.name)
  ::bundle({
    animations,
    components,
    configs,
    constants,
    controllers,
    decorators,
    directives,
    factories,
    filters,
    providers,
    scripts,
    services,
    values
  })

//
// export the module name
//

// return the name of the angular module
export default ssi.name
