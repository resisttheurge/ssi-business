import angular from 'angular'

export default angular.module('carrierControllers', [])

  .controller('CarrierListController', [
    '$scope', 'Carrier', '$filter', '$q',
    function ($scope, Carrier, $filter, $q) {
      var orderBy = $filter('orderBy')
      $scope.query = {
        page: 1,
        limit: 10,
        order: 'id'
      }

      $scope.$watch('search', function (x, y) { getCarriers($scope.query) }, true)

      $scope.onPaginate = function (page, limit) {
        return getCarriers(angular.extend({}, $scope.query, { page: page, limit: limit }))
      }

      $scope.onReorder = function (order) {
        return getCarriers(angular.extend({}, $scope.query, { order: order }))
      }

      function getCarriers(query) {
        return $scope.promise =
          Carrier.endpoint.query().$promise
            .then(unpackResponse)
            .then(carrierSearchFilter)
            .then(total)
            .then(sort(query))
            .then(page(query))
            .then(store)
      }

      function unpackResponse(response) {
        return $q(function (resolve, reject) {
          if (response) {
            if (response.success) {
              return resolve(response.data)
            } else {
              return reject(response.message ? response.message : 'API response failed')
            }
          } else {
            return reject('API response was undefined')
          }
        })
      }

      function carrierSearchFilter(carriers) {

        var resultArray = [];
        if ($scope.search)
        {
          if (carriers)
            carriers.forEach(function (carrier) {

              if ($scope.search && !carrier.label.toUpperCase().match(new RegExp('^' + $scope.search.toUpperCase() + '.*'))) {}

              //don't add to results array
              else

                //doesn't violate constraints, add to results array
                resultArray.push(carrier);
            })

          return resultArray;
        } else
          return carriers;
      }

      function total(array) {
        $scope.total = array.length
        return array
      }

      function sort(query) {
        return function (array) {
          return orderBy(array, query.order)
        }
      }

      function page(query) {
        var end = query.page * query.limit
          , begin = end - query.limit
        return function (array) {
          return array.slice(begin, end)
        }
      }

      function store(carriers) {
        return $scope.carriers = carriers
      }

      getCarriers($scope.query)
    }
  ])

  .controller('CarrierDetailController', ['$scope', '$routeParams', 'Carrier',
    function ($scope, $routeParams, Carrier) {
      Carrier.endpoint.get({ carrierId: $routeParams.carrierId }, function (response) {
        $scope.loading = true;
        if (response.success) {
          $scope.carrier = response.data
        } else {
          $scope.error = true
          $scope.message = response.message
        }

        $scope.loading = false
      })
    }
  ])

  .name
