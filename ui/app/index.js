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
import _modules from 'modules'

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
    ..._modules
  ])

//
// configure the module
//

// import utilities
import { controllers, filters, services } from 'utils/ng'

// import configurations
import _controllers from 'controllers'
import _filters from 'filters'
import _services from 'services'

// run the configurations
angular.module(ssi.name)
  ::controllers(_controllers)
  ::filters(_filters)
  ::services(_services)

//
// export the module name
//

// return the name of the angular module
export default ssi.name
