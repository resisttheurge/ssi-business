import { ListController } from 'utils'

export default class VendorListController extends ListController {
  /*@ngInject*/
  constructor($scope, Vendor, $filter, $q) {
    super()
    var orderBy = $filter('orderBy')
    $scope.query = {
      page: 1,
      limit: 10,
      order: 'id'
    }

    $scope.onPaginate = function (page, limit) {
      return getVendors(angular.extend({}, $scope.query, { page: page, limit: limit }))
    }

    $scope.onReorder = function (order) {
      return getVendors(angular.extend({}, $scope.query, { order: order }))
    }

    $scope.$watch('search', function (x, y) { getVendors($scope.query) }, true)

    function getVendors(query) {
      return $scope.promise =
        Vendor.endpoint.query().$promise
          .then(unpackResponse)
          .then(searchFilter)
          .then(total)
          .then(sort(query))
          .then(page(query))
          .then(store)
    }

    function searchFilter(items) {

      var resultArray = [];
      if ($scope.search)
      {
        if (items)
          items.forEach(function (item) {

            if ($scope.search && !item.label.toUpperCase().match(new RegExp('^' + $scope.search.toUpperCase() + '.*'))) {}

            //don't add to results array
            else

              //doesn't violate constraints, add to results array
              resultArray.push(item);
          })

        return resultArray;
      } else
        return items;
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

    function store(vendors) {
      return $scope.vendors = vendors
    }

    getVendors($scope.query)
  }
}
