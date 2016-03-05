'use strict'

var customerControllers = angular.module('customerControllers', [])

customerControllers.controller('CustomerListController', [
  '$scope', 'Customer', '$filter', '$q',
  function($scope, Customer, $filter, $q){
    var orderBy = $filter('orderBy')
    $scope.query = {
      page: 1,
      limit: 10,
      order: 'id'
    }

    $scope.$watch("search", function(x, y){ getCustomers($scope.query) }, true)

    $scope.onPaginate = function (page, limit) {
      return getCustomers(angular.extend({}, $scope.query, {page: page, limit: limit}))
    }

    $scope.onReorder = function (order) {
      return getCustomers(angular.extend({}, $scope.query, {order: order}))
    }

    function getCustomers(query) {
      return $scope.promise =
        Customer.endpoint.query().$promise
          .then(unpackResponse)
          .then(customerSearchFilter)
          .then(total)
          .then(sort(query))
          .then(page(query))
          .then(store)
    }

    function customerSearchFilter(customers) {

      var resultArray = [];
      if($scope.search)
      {
        if(customers)
          customers.forEach(function(customer){

              if($scope.search && !customer.label.toUpperCase().match(new RegExp("^" + $scope.search.toUpperCase() + ".*"))){}
                //don't add to results array
              else
                //doesn't violate constraints, add to results array
                resultArray.push(customer);
          })
          return resultArray;
      }
      else
        return customers;
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

    function store(customers) {
      return $scope.customers = customers
    }

    getCustomers($scope.query)
  }
])

customerControllers.controller('CustomerDetailController', ['$scope', '$routeParams', 'Customer',
  function($scope, $routeParams, Customer){
    Customer.endpoint.get({customerId: $routeParams.customerId}, function(response){
      $scope.loading = true;
      if(response.success) {
        $scope.customer = response.data
      } else {
        $scope.error = true
        $scope.message = response.message
      }
      $scope.loading = false
    })
  }
])
