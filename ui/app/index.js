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
// TODO: import ngComponentRouter from '@angular/router/angular1/angular_1_router.js'

import ngRoute from 'angular-route'

// Restangular for api services
// TODO: import Restangular from 'restangular'
import ngResource from 'angular-resource'

// import sub-modules
import ssiConfigs from 'configs'
import ssiConstants from 'constants'
import ssiControllers from 'controllers'
import ssiFilters from 'filters'
import ssiServices from 'services'
import ssiTemplates from 'templates'
import ssiUtils from 'utils'

export const ssi =
  angular.module('ssi', [
    ngAnimate,
    ngAria,
    ngMessages,

    ngMaterial,
    ngMaterialDataTable,

    // TODO: ngComponentRouter,
    ngRoute,

    // TODO: Restangular,
    ngResource,

    // sub module dependencies
    ssiConfigs.name,
    ssiConstants.name,
    ssiControllers.name,
    ssiFilters.name,
    ssiServices.name,
    ssiTemplates.name,
    ssiUtils.name
  ])
