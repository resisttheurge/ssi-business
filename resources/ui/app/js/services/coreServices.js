'use strict'

var coreServices = angular.module('coreServices', [])

coreServices.factory(
  'userService',
  function() {

    var user = {
      isLoggedIn: false,
      username: '',
      roles: []
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

coreServices.factory(
  'selectionService',
  function() {
    var selected = {
      job: null
    }

    return {
      selected: selected
    }
  }
)
