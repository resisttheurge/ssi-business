import { ListController } from 'utils'

export default class MarkListController extends ListController {
  /*@ngInject*/
  constructor($scope, MarkByDrawing, $filter, $q, $routeParams, $mdDialog, $mdToast, Mark, $route) {
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
          .textContent(`Are you sure you want to delete mark ${item.label}?`)
          .ok('ok')
          .cancel('cancel')
      )
      .then(() => Mark.delete(item))
      .then(
        () =>
          $mdToast.show(
            $mdToast.simple()
              .textContent(`Deleted mark ${item.label}`)
              .position('bottom right')
          )
          .then(() => $route.reload()),
        reason => $mdToast.show(
          $mdToast.simple()
            .textContent(`Could not delete mark ${item.label} because ${reason}`)
            .position('bottom right')
          )
      )

    $scope.onPaginate = function (page, limit) {
      return getMarks(angular.extend({}, $scope.query, { page: page, limit: limit }))
    }

    $scope.onReorder = function (order) {
      return getMarks(angular.extend({}, $scope.query, { order: order }))
    }

    function getMarks(query) {
      return $scope.promise =
        MarkByDrawing.endpoint.query($routeParams).$promise
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

    function store(marks) {
      return $scope.marks = marks
    }

    getMarks($scope.query)
  }
}
