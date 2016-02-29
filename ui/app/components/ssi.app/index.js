import angular from 'angular'

import ngAnimate from 'angular-animate'
import ngAria from 'angular-aria'
import ngMaterial from 'angular-material'
import ngUiRouter from 'angular-ui-router'

import 'angular-material/angular-material.scss'

import HomeController from './HomeController'
import routes from './routes'

export default
  angular.module('ssi.app', [ngAnimate, ngAria, ngMaterial, ngUiRouter])
    .controller('HomeController', HomeController)
    .config(routes)
    .name
