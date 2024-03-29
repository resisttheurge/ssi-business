import { ListController } from 'utils'

export default class ShippingGroupListController extends ListController {
  /*@ngInject*/
  constructor($scope, ShippingGroup, ShippingGroupByJob, $filter, $q, $routeParams, $mdDialog, $mdToast, $route) {
    super()
    var orderBy = $filter('orderBy')
    $scope.query = {
      page: 1,
      limit: 10,
      order: 'id'
    }

    $scope.onPaginate = function (page, limit) {
      return getShippingGroups(angular.extend({}, $scope.query, { page: page, limit: limit }))
    }

    $scope.onReorder = function (order) {
      return getShippingGroups(angular.extend({}, $scope.query, { order: order }))
    }

    $scope.delete = item =>
      $mdDialog.show(
        $mdDialog.confirm()
          .title(`Are you sure?`)
          .textContent(`Are you sure you want to delete shipping group ${item.label}?`)
          .ok('ok')
          .cancel('cancel')
      )
      .then(() => ShippingGroup.delete(item))
      .then(
        () =>
          $mdToast.show(
            $mdToast.simple()
              .textContent(`Deleted shipping group ${item.label}`)
              .position('bottom right')
          )
          .then(() => $route.reload()),
        reason => $mdToast.show(
          $mdToast.simple()
            .textContent(`Could not delete shipping group ${item.label}`)
            .position('bottom right')
          )
      )

    function getShippingGroups(query) {
      return $scope.promise =
        ShippingGroupByJob.list($routeParams)
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

    function store(shippingGroups) {
      return $scope.shippingGroups = shippingGroups
    }

    getShippingGroups($scope.query)
  }
}
