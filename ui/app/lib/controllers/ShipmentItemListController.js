import { ListController } from 'utils'

export default class ShipmentItemListController extends ListController {
  /*@ngInject*/
  constructor($scope, ShipmentItem, ShipmentItemByShipment, $filter, $q, $routeParams, $mdDialog, $mdToast, $route) {
    super()
    var orderBy = $filter('orderBy')
    $scope.query = {
      page: 1,
      limit: 10,
      order: 'id'
    }

    $scope.delete = item =>
      $mdDialog.show(
        $mdDialog.confirm()
          .title(`Are you sure?`)
          .textContent(`Are you sure you want to delete shipment item ${item.shippingItem.label}?`)
          .ok('ok')
          .cancel('cancel')
      )
      .then(() => ShipmentItem.delete(item))
      .then(
        () =>
          $mdToast.show(
            $mdToast.simple()
              .textContent(`Deleted shipment item ${item.shippingItem.label}`)
              .position('bottom right')
          )
          .then(() => $route.reload()),
        reason => $mdToast.show(
          $mdToast.simple()
            .textContent(`Could not delete shipment item ${item.shippingItem.label}`)
            .position('bottom right')
          )
      )

    $scope.onPaginate = function (page, limit) {
      return getShipmentItems(angular.extend({}, $scope.query, { page: page, limit: limit }))
    }

    $scope.onReorder = function (order) {
      return getShipmentItems(angular.extend({}, $scope.query, { order: order }))
    }

    function getShipmentItems(query) {
      return $scope.promise =
        ShipmentItemByShipment.endpoint.query($routeParams).$promise
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

    function store(shipmentItems) {
      return $scope.shipmentItems = shipmentItems
    }

    $scope.$watch(() => { return ShipmentItem.refresh },

    (newValue, oldValue) => {
      if (ShipmentItem.refresh === true)
      {
        getShipmentItems($scope.query = {
          page: 1,
          limit: 10,
          order: 'id'
        })
        ShipmentItem.refresh = false;
      }
    })

    getShipmentItems($scope.query)
  }
}
