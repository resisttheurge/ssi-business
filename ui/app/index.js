import angular from 'angular'
import ngUiRouter from 'angular-ui-router'

import home from 'home'
import login from 'login'

import routing from './routing'
import access from './access'

export default
  angular.module('ssi', [
    ngUiRouter,
    home,
    login
  ])
    .config(routing)
    .run(access)
    .name
