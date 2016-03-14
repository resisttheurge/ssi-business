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

// import submodules
import ssiApp from 'ssi.app'
import ssiConfig from 'ssi.config'
import ssiNavigation from 'ssi.navigation'
import ssiSettings from 'ssi.settings'

export default
  angular.module( 'ssi', [
    ngAnimate,
    ngAria,
    ngMessages,
    ngMaterial,
    ngMaterialDataTable,
    ngComponentRouter,
    Restangular,
    ssiApp,
    ssiConfig,
    ssiNavigation,
    ssiSettings
  ])
  .name
