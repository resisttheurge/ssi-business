import { ListController } from 'utils'

export default class PartListController extends ListController {
  /*@ngInject*/
  constructor($scope, Part, $filter, $q) {
    super()
    var orderBy = $filter('orderBy')
    $scope.query = {
      page: 1,
      limit: 10,
      order: 'id'
    }

    $scope.onPaginate = function (page, limit) {
      return getParts(angular.extend({}, $scope.query, { page: page, limit: limit }))
    }

    $scope.onReorder = function (order) {
      return getParts(angular.extend({}, $scope.query, { order: order }))
    }

    function getParts(query) {
      return $scope.promise =
        Part.endpoint.query().$promise
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

            if ($scope.search && !item.description.toUpperCase().match(new RegExp($scope.search.toUpperCase()))) {}

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

    function store(parts) {
      return $scope.parts = parts
    }

    getParts($scope.query)
  }
}
