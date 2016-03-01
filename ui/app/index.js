import angular from 'angular'
import ngAnimate from 'angular-animate'
import ngAria from 'angular-aria'
import ngMaterial from 'angular-material'
import ngUiRouter from 'angular-ui-router'

// include angular-material css in html
import 'angular-material/angular-material.scss'

// include app-wide css
import './styles.scss'

// shared
import auth from 'auth'
import constants from 'constants'

// components
import home from 'home'
import login from 'login'

// config
import routing from './routing'
import access from './access'

// legacy -- due for refactoring
import oldControllers from 'old-controllers'
import oldServices from 'old-services'
import oldCore from 'old-core'

export default
  angular.module('ssi', [
    ngAnimate,
    ngAria,
    ngMaterial,
    ngUiRouter,
    auth,
    constants,
    home,
    login,
    oldControllers,
    oldServices,
    oldCore
  ])
    .config(routing)
    .run(access)
    .name
