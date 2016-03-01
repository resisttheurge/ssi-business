import angular from 'angular'
import ngResource from 'angular-resource'

import $authentication from './$authentication'
import $user from './$user'

export default
  angular.module('ssi.auth', [ngResource])
    .factory('$authentication', $authentication)
    .factory('$user', $user)
    .name
