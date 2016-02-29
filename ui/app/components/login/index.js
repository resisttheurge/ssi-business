import angular from 'angular'

import ngUiRouter from 'angular-ui-router'

import LoginController from './LoginController'
import routes from './loginRoutes'

export default
  angular.module('ssi.login', [ngUiRouter])
    .controller('LoginController', LoginController)
    .config(routes)
    .name
