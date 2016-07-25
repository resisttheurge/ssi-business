import { ListController } from 'utils'

export default class CarrierListController extends ListController {
  /*@ngInject*/
  constructor($scope, Carrier, $filter, $q, $mdDialog, $mdToast, $route) {
    super()
    var orderBy = $filter('orderBy')
    $scope.query = {
      page: 1,
      limit: 10,
      order: 'id'
    }

    $scope.$watch('search', function (x, y) { getCarriers($scope.query) }, true)

    $scope.onPaginate = function (page, limit) {
      return getCarriers(angular.extend({}, $scope.query, { page: page, limit: limit }))
    }

    $scope.onReorder = function (order) {
      return getCarriers(angular.extend({}, $scope.query, { order: order }))
    }

    $scope.delete = item =>
      $mdDialog.show(
        $mdDialog.confirm()
          .title(`Are you sure?`)
          .textContent(`Are you sure you want to delete carrier ${item.label}?`)
          .ok('ok')
          .cancel('cancel')
      )
      .then(() => Carrier.delete(item))
      .then(
        () =>
          $mdToast.show(
            $mdToast.simple()
              .textContent(`Deleted carrier ${item.label}`)
              .position('bottom right')
          )
          .then(() => $route.reload()).then(() => this.refresh()),
        reason => $mdToast.show(
          $mdToast.simple()
            .textContent(`Could not delete carrier ${item.label}`)
            .position('bottom right')
          )
      )

    function getCarriers(query) {
      return $scope.promise =
        Carrier.endpoint.query().$promise
          .then(unpackResponse)
          .then(carrierSearchFilter)
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

    function carrierSearchFilter(carriers) {
      return $filter('filter')(items, $scope.search, false, 'label')
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

    function store(carriers) {
      return $scope.carriers = carriers
    }

    getCarriers($scope.query)
  }
}
