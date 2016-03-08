export default class JobDetailController {
    constructor(
      $scope, $routeParams, $q, Address, Customer, Job, Schedule,
      Shop, Salesperson, enums, $filter, $unpack
    ) {

      function filter(expression, comparator) {
        return function (array) {
          return $q(function (resolve, reject) {
            return resolve($filter('filter')(array, expression, comparator))
          })
        }
      }

      function loadJob() {
        console.log('begin loadJob')
        return loading().then(function () {
          console.log(JSON.stringify($routeParams))
          return Job.get($routeParams)
        }).then(store).then(loaded).catch(function (reason) {throw reason})
      }

      function loaded(data) {
        return $q(function (resolve, reject) {
          console.log('done loading')
          $scope.mode = ''
          return resolve(data)
        })
      }

      function loading(data) {
        return $q(function (resolve, reject) {
          console.log('loading')
          $scope.mode = 'indeterminate'
          return resolve(data)
        })
      }

      $scope.queryCustomers = function queryCustomers(expression) {
        return Customer.endpoint.query().$promise.then($unpack).then(filter(expression))
      }

      $scope.queryPrefixes = function queryPrefixes(expression) {
        return $q(function (resolve, reject) {
          return resolve(enums.prefixes)
        }).then(filter(expression))
      }

      $scope.querySalespeople = function querySalespeople(expression) {
        return Salesperson.endpoint.query().$promise.then($unpack).then(filter(expression))
      }

      $scope.queryShops = function queryShops(expression) {
        return Shop.endpoint.query().$promise.then($unpack).then(filter(expression))
      }

      $scope.queryStatuses = function queryStatuses(expression) {
        return $q(function (resolve, reject) {
          return resolve(enums.jobStatuses)
        }).then(filter(expression))
      }

      function store(job) {
        return $q(function (resolve, reject) {
          console.log('storing job')
          return resolve($scope.job = job)
        })
      }

      loadJob()

    }
}
