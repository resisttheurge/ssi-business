import { ListController } from 'utils'

export default class ManufacturerListController extends ListController {
  /*@ngInject*/
  constructor($scope, Manufacturer, $filter, $q, $mdDialog, $mdToast, $route) {
    super()
    var orderBy = $filter('orderBy')
    $scope.query = {
      page: 1,
      limit: 10,
      order: 'label'
    }

    $scope.onPaginate = function (page, limit) {
      return getManufacturers(angular.extend({}, $scope.query, { page: page, limit: limit }))
    }

    $scope.onReorder = function (order) {
      return getManufacturers(angular.extend({}, $scope.query, { order: order }))
    }

    $scope.$watch('search', function (x, y) { getManufacturers($scope.query) }, true)

    $scope.delete = item =>
      $mdDialog.show(
        $mdDialog.confirm()
          .title(`Are you sure?`)
          .textContent(`Are you sure you want to delete manufacturer ${item.label}?`)
          .ok('ok')
          .cancel('cancel')
      )
      .then(() => Manufacturer.delete(item))
      .then(
        () =>
          $mdToast.show(
            $mdToast.simple()
              .textContent(`Deleted manufacturer ${item.label}`)
              .position('bottom right')
          )
          .then(() => $route.reload()).then(() => this.refresh()),
        reason => $mdToast.show(
          $mdToast.simple()
            .textContent(`Could not delete manufacturer ${item.label}`)
            .position('bottom right')
          )
      )

    function getManufacturers(query) {
      return $scope.promise =
        Manufacturer.endpoint.query().$promise
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

    function store(manufacturers) {
      return $scope.manufacturers = manufacturers
    }

    $scope.$watch(() => $scope.search,
      (o) => {
        getManufacturers($scope.query);
        $scope.query.page = 1;
      })

    getManufacturers($scope.query)
  }
}
