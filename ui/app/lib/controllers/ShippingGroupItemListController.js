export default class ShippingGroupItemListController {
  constructor($scope, ShippingGroupItemByShippingGroup, $filter, $q, $routeParams, selectionService) {
    $scope.selected = selectionService.selected
    $scope.selectShippingGroupItem = selectionService.selectShippingGroupItem
    var orderBy = $filter('orderBy')
    $scope.query = {
      page: 1,
      limit: 10,
      order: 'id'
    }

    $scope.onPaginate = function (page, limit) {
      return getShippingGroupItems(angular.extend({}, $scope.query, { page: page, limit: limit }))
    }

    $scope.onReorder = function (order) {
      return getShippingGroupItems(angular.extend({}, $scope.query, { order: order }))
    }

    function getShippingGroupItems(query) {
      return $scope.promise =
        ShippingGroupItemByShippingGroup.endpoint.query($routeParams).$promise
          .then(unpackResponse)
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

    function store(shippingGroupItems) {
      return $scope.shippingGroupItems = shippingGroupItems
    }

    getShippingGroupItems($scope.query)
  }
}
