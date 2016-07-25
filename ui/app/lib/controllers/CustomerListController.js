import { ListController } from 'utils'

export default class CustomerListController extends ListController {
  /*@ngInject*/
  constructor($scope, Customer, $filter, $q, $mdDialog, $mdToast, $route) {
    super()
    var orderBy = $filter('orderBy')
    $scope.query = {
      page: 1,
      limit: 10,
      order: 'id'
    }

    $scope.$watch('search', function (x, y) { getCustomers($scope.query) }, true)

    $scope.onPaginate = function (page, limit) {
      return getCustomers(angular.extend({}, $scope.query, { page: page, limit: limit }))
    }

    $scope.onReorder = function (order) {
      return getCustomers(angular.extend({}, $scope.query, { order: order }))
    }

    $scope.delete = item =>
      $mdDialog.show(
        $mdDialog.confirm()
          .title(`Are you sure?`)
          .textContent(`Are you sure you want to delete customer ${item.label}?`)
          .ok('ok')
          .cancel('cancel')
      )
      .then(() => Customer.delete(item))
      .then(
        () =>
          $mdToast.show(
            $mdToast.simple()
              .textContent(`Deleted customer ${item.label}`)
              .position('bottom right')
          )
          .then(() => $route.reload()).then(() => this.refresh()),
        reason => $mdToast.show(
          $mdToast.simple()
            .textContent(`Could not delete customer ${item.label}`)
            .position('bottom right')
          )
      )

    function getCustomers(query) {
      return $scope.promise =
        Customer.endpoint.query().$promise
          .then(unpackResponse)
          .then(customerSearchFilter)
          .then(total)
          .then(sort(query))
          .then(page(query))
          .then(store)
    }

    function customerSearchFilter(customers) {
      return $filter('filter')(customers, $scope.search, false, 'label')
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

    function store(customers) {
      return $scope.customers = customers
    }

    $scope.$watch(() => $scope.search,
      (o) => {
        getCustomers($scope.query);
        $scope.query.page = 1;
      })

    getCustomers($scope.query)
  }
}
