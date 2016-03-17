import { ListController } from 'utils'

export default class SalespersonListController extends ListController {
  /*@ngInject*/
  constructor($scope, Salesperson, $filter, $q) {
    super()
    var orderBy = $filter('orderBy')
    $scope.query = {
      page: 1,
      limit: 10,
      order: 'id'
    }

    $scope.onPaginate = function (page, limit) {
      return getSalespersons(angular.extend({}, $scope.query, { page: page, limit: limit }))
    }

    $scope.onReorder = function (order) {
      return getSalespersons(angular.extend({}, $scope.query, { order: order }))
    }

    $scope.$watch('search', function (x, y) { getSalespersons($scope.query) }, true)

    function getSalespersons(query) {
      return $scope.promise =
        Salesperson.endpoint.query().$promise
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
          resultArray = items.filter(function (item) {
            var names = item.label.split(' ');
            for (var itemIndex = 0; itemIndex < names.length; itemIndex++)
              if (names[itemIndex].toUpperCase().match(new RegExp('^' + $scope.search.toUpperCase() + '.*')))
                return true;
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

    function store(salespeople) {
      return $scope.salespeople = salespeople
    }

    getSalespersons($scope.query)
  }
}
