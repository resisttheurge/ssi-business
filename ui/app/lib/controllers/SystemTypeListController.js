import { ListController } from 'utils'

export default class SystemTypeListController extends ListController {
  /*@ngInject*/
  constructor($scope, SystemType, $filter, $q, $mdDialog, $mdToast, $route) {
    super()
    var orderBy = $filter('orderBy')
    $scope.query = {
      page: 1,
      limit: 10,
      order: 'label'
    }

    $scope.onPaginate = function (page, limit) {
      return getSystemTypes(angular.extend({}, $scope.query, { page: page, limit: limit }))
    }

    $scope.onReorder = function (order) {
      return getSystemTypes(angular.extend({}, $scope.query, { order: order }))
    }

    $scope.$watch('search', function (x, y) { getSystemTypes($scope.query) }, true)

    $scope.delete = item =>
      $mdDialog.show(
        $mdDialog.confirm()
          .title(`Are you sure?`)
          .textContent(`Are you sure you want to delete system type ${item.label}?`)
          .ok('ok')
          .cancel('cancel')
      )
      .then(() => SystemType.delete(item))
      .then(
        () =>
          $mdToast.show(
            $mdToast.simple()
              .textContent(`Deleted system type ${item.label}`)
              .position('bottom right')
          )
          .then(() => $route.reload()).then(() => this.refresh()),
        reason => $mdToast.show(
          $mdToast.simple()
            .textContent(`Could not delete system type ${item.label}`)
            .position('bottom right')
          )
      )

    function getSystemTypes(query) {
      return $scope.promise =
        SystemType.endpoint.query().$promise
          .then(unpackResponse)
          .then(searchFilter)
          .then(total)
          .then(sort(query))
          .then(page(query))
          .then(store)
    }

    function searchFilter(items) {
      return $filter('filter')(items, $scope.search, false, 'label')
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

    function store(systemTypes) {
      return $scope.systemTypes = systemTypes
    }

    getSystemTypes($scope.query)
  }
}
