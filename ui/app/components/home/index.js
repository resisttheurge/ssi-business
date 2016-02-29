import angular from 'angular'

import ngUiRouter from 'angular-ui-router'

import HomeController from './HomeController'
import routes from './homeRoutes'

export default
  angular.module('ssi.home', [ngUiRouter])
    .controller('HomeController', HomeController)
    .config(routes)
    .name
