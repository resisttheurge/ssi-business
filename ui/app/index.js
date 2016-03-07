//
// import dependencies
//

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
import ngComponentRouter from '@angular/router/angular1/angular_1_router.js'

// Restangular for api services
import Restangular from 'restangular'

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
    ngComponentRouter,

    // api dependencies
    Restangular,

    // sub module dependencies
    ...modules
  ])

//
// configure the module
//

// config router root component
import ssiApp from 'components/ssi-app'
ssi.value('$routerRootComponent', ssiApp)

//
// register injectables with the module
//

import components from 'components'
components.forEach(({ name, config }) => ssi.component(name, config))

//
// export the module name
//

// return the name of the angular module
export default ssi.name
