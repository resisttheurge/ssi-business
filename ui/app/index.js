import angular from 'angular'
import ngUiRouter from 'angular-ui-router'

import app from 'ssi.app'

import routing from './routing'

export default
  angular.module('ssi', [ngUiRouter, app])
    .config(routing)
    .name
