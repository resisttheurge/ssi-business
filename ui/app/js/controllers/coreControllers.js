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
    '$location',
    '$mdToast',
    'userService',
    'AuthService',
    function($scope, $location, $mdToast, userService, AuthService) {
      $scope.user = {
        username: '',
        password: ''
      }

      $scope.reset = function(){
        $scope.user.username = ''
        $scope.user.password = ''
      }

      $scope.login = function(user) {
        AuthService.login(angular.copy(user), function(response){
          if(response.success){
            userService.user.isLoggedIn = true
            userService.user.username = response.data.username
            userService.user.roles = response.data.roles
            $location.path('/home')
          } else {
            $mdToast.show(
              $mdToast.simple()
                .textContent(response.message)
                .action('OK')
                .highlightAction(false)
                .position('bottom right')
            )
          }
        })
        $scope.reset()
      }
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
    '$mdSidenav',
    '$mdMedia',
    'userService',
    'selectionService',
    'routes',
    function (
      $scope,
      $route,
      $routeParams,
      $location,
      $rootScope,
      $mdSidenav,
      $mdMedia,
      userService,
      selectionService,
      routes
    ) {

      // grab the user and logout function
      $scope.user = userService.user
      $scope.logout = function() {
        userService.logout()
        $location.path('/login')
      }

      $scope.selected = selectionService.selected

      $scope.isUserLoggedIn = function() {
        return $scope.user.isLoggedIn
      }

      $scope.isNavLockedOpen = function() {
        return $scope.user.isLoggedIn() && $mdMedia('gt-sm')
      }

      // set up sidenav toggling
      $scope.toggleSidenav = function() {
        $mdSidenav('sidenav').toggle()
      }

      // handle login-based access restriction
      $scope.$on('$routeChangeStart', function(event, next, current) {
        if (next.access != undefined) {
          if(!next.access.allowAnonymous) {
            if(userService.user.isLoggedIn){
              var allow = false
              for(var i in userService.user.roles) {
                if(next.access.allowedRoles.indexOf(userService.user.roles[i]) != -1){
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
              if(!routes[i].access.allowAnonymous) {
                if(userService.user.isLoggedIn){
                  var allow = false
                  for(var j in userService.user.roles) {
                    if(routes[i].access.allowedRoles.indexOf(userService.user.roles[j]) != -1){
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
