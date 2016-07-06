import { ListController } from 'utils'

export default class PartOrderListController extends ListController {
  /*@ngInject*/
  constructor($scope, PartOrderByJob, $filter, $q, $routeParams, $mdDialog, $mdToast, PartOrder, $route) {
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
          .textContent(`Are you sure you want to delete part order [${item.id}] ${item.partNumber}?`)
          .ok('ok')
          .cancel('cancel')
      )
      .then(() => PartOrder.delete(item))
      .then(
        () =>
          $mdToast.show(
            $mdToast.simple()
              .textContent(`Deleted part order [${item.id}] ${item.partNumber}`)
              .position('bottom right')
          )
          .then(() => $route.reload()),
        reason => $mdToast.show(
          $mdToast.simple()
            .textContent(`Could not delete part order [${item.id}] ${item.partNumber} because ${reason}`)
            .position('bottom right')
          )
      )

    $scope.onPaginate = function (page, limit) {
      return getPartOrders(angular.extend({}, $scope.query, { page: page, limit: limit }))
    }

    $scope.onReorder = function (order) {
      return getPartOrders(angular.extend({}, $scope.query, { order: order }))
    }

    function getPartOrders(query) {
      return $scope.promise =
        PartOrderByJob.endpoint.query($routeParams).$promise
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

    function store(partOrders) {
      return $scope.partOrders = partOrders
    }

    getPartOrders($scope.query)
  }
}
