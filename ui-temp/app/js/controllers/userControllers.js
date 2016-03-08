var userControllers = angular.module('userControllers', [])

userControllers.controller('UserListController', [
  '$scope', 'User', '$filter', '$q',
  function($scope, User, $filter, $q){
    var orderBy = $filter('orderBy')
    $scope.query = {
      page: 1,
      limit: 10,
      order: 'id'
    }

    $scope.onPaginate = function (page, limit) {
      return getUsers(angular.extend({}, $scope.query, {page: page, limit: limit}))
    }

    $scope.onReorder = function (order) {
      return getUsers(angular.extend({}, $scope.query, {order: order}))
    }

    function getUsers(query) {
      return $scope.promise =
        User.endpoint.query().$promise
          .then(unpackResponse)
          .then(total)
          .then(sort(query))
          .then(page(query))
          .then(store)
    }

    function unpackResponse(response) {
      return $q(function(resolve, reject) {
        if(response) {
          if(response.success) {
            return resolve(response.data)
          } else {
            return reject(response.message ? response.message : 'API response failed')
          }
        } else {
          return reject('API response was undefined')
        }
      })
    }

    function total(array) {
      $scope.total = array.length
      return array
    }

    function sort(query) {
      return function(array) {
        return orderBy(array, query.order)
      }
    }

    function page(query) {
      var end = query.page * query.limit
        , begin = end - query.limit
      return function(array) {
        return array.slice(begin, end)
      }
    }

    function store(users) {
      return $scope.users = users
    }

    getUsers($scope.query)
  }
])

userControllers.controller('UserDetailController', ['$scope', '$routeParams', 'User',
  function($scope, $routeParams, User) {
    User.endpoint.get({userId: $routeParams.userId}, function(response){
      $scope.loading = true
      if(response.success) {
        $scope.user = response.data
      } else {
        $scope.error = true
        $scope.message = response.message
      }
      $scope.loading = false
    })
  }
])