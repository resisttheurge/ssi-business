'use strict'

var coreControllers = angular.module('coreControllers', [])

coreControllers.controller(
  'HomeController',
  [
    '$scope',
    function($scope) {

    }
  ]
)

coreControllers.controller(
  'LoginController',
  [
    '$scope',
    'userService',
    'Auth',
    function($scope, userService, Auth) {

    }
  ]
)

coreControllers.controller(
  'RootController',
  [
    '$scope',
    '$route',
    '$routeParams',
    '$location',
    '$rootScope',
    'userService',
    'routes',
    function($scope, $route, $routeParams, $location, $rootScope, userService, routes) {

      // grab the user and logout function
      $scope.user = userService.user
      $scope.logout = userService.logout

      // handle login-based access restriction
      $scope.$on('$routeChangeStart', function(event, next, current) {
        if (next.access != undefined) {
          console.log('access is not undefined')
          console.log(JSON.stringify(next.access))
          if(!next.access.allowAnonymous) {
            console.log('next does not allow anoymous')
            if(userService.user.isLoggedIn){
              console.log('user is logged in')
              var allow = false

              for(var i in userService.user.roles) {
                console.log('checking user role ' + userService.user.roles[i])
                if(next.access.allowedRoles.indexOf(userService.user.roles[i]) != -1){
                  console.log('role ' + userService.user.roles[i] + ' is allowed')
                  allow = true
                }
              }

              if(!allow){
                $location.path('/login')
              }

            } else {
              $location.path('/login')
            }
          }
        }
      })

      // handle login-based access restriction
      $rootScope.$on('$locationChangeStart', function(event, next, current) {
        for(var i in routes){
          if(next.indexOf(i) != -1){
            if (routes[i].access != undefined) {
              console.log('access is not undefined')
              console.log(JSON.stringify(routes[i].access))
              if(!routes[i].access.allowAnonymous) {
                console.log('next does not allow anoymous')
                if(userService.user.isLoggedIn){
                  console.log('user is logged in')

                  var allow = false

                  for(var i in userService.user.roles) {
                    console.log('checking user role ' + userService.user.roles[i])
                    if(routes[i].access.allowedRoles.indexOf(userService.user.roles[i]) != -1){
                      console.log('role ' + userService.user.roles[i] + ' is allowed')
                      allow = true
                    }
                  }

                  if(!allow){
                    $location.path('/login')
                  }

                } else {
                  $location.path('/login')
                }
              }
            }
          }
        }
      })


    }
  ]
)
