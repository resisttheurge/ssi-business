'use strict'

var coreServices = angular.module('coreServices', [])

coreServices.factory(
  'userService',
  function() {

    var user = {
      isLoggedIn: true,
      username: 'admin',
      roles: ['ADMIN', 'EMPLOYEE']
    }

    var reset = function() {
      user.isLoggedIn = false
      user.username = ''
      user.roles = []
    }

    return {
      user: user,
      logout: reset
    }

  }
)
