import { ListController } from 'utils'

export default class DrawingListController extends ListController {
  /*@ngInject*/
  constructor($scope, Drawing, DrawingByJob, $filter, $q, $routeParams, $mdDialog, $mdToast, $route) {
    super()
    var orderBy = $filter('orderBy')
    $scope.query = {
      page: 1,
      limit: 10,
      order: 'label'
    }

    $scope.onPaginate = function (page, limit) {
      return getDrawings(angular.extend({}, $scope.query, { page: page, limit: limit }))
    }

    $scope.onReorder = function (order) {
      return getDrawings(angular.extend({}, $scope.query, { order: order }))
    }

    $scope.delete = item =>
      $mdDialog.show(
        $mdDialog.confirm()
          .title(`Are you sure?`)
          .textContent(`Are you sure you want to delete drawing ${item.label}?`)
          .ok('ok')
          .cancel('cancel')
      )
      .then(() => Drawing.delete(item))
      .then(
        () =>
          $mdToast.show(
            $mdToast.simple()
              .textContent(`Deleted drawing ${item.label}`)
              .position('bottom right')
          )
          .then(() => $route.reload()),
        reason => $mdToast.show(
          $mdToast.simple()
            .textContent(`Could not delete drawing ${item.label}`)
            .position('bottom right')
          )
      )

    function getDrawings(query) {
      return $scope.promise =
        DrawingByJob.endpoint.query($routeParams).$promise
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

    function store(drawings) {
      return $scope.drawings = drawings
    }

    getDrawings($scope.query)
  }
}
