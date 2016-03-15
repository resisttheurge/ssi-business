import { DetailController } from 'utils'

export default class JobDetailController extends DetailController {
  /*@ngInject*/
  constructor(
    $scope, $routeParams, $q, Address, Customer, Job, Schedule,
    Shop, Salesperson, enums, $filter, $mdDialog, $unpack
  ) {
    super()

    $scope.prefixes     = enums.prefixes
    $scope.jobStatuses  = enums.jobStatuses

    // this.prefixes     = enums.prefixes
    // this.jobStatuses  = enums.jobStatuses

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

    $scope.update = function update(item)
    {
      Job.update(item).then(function (data) { $mdDialog
        .show($mdDialog.alert()
        .title('Changes Saved!')
        .textContent('Changes to this record have been saved')
        .ok('Close'));
      }, function (error) { $mdDialog
        .show($mdDialog.alert()
        .title('Failed to Save')
        .textContent('There has been an error, changes have not been saved')
      .ok('Close'))});
    }

    $scope.openDrawings = function openDrawings(event)
    {
      $mdDialog.show({
         controller: 'DrawingListController',
         templateUrl: 'drawing-list.html',
         parent: angular.element(document.body),
         targetEvent: event,
         clickOutsideToClose: false,
         fullscreen: false
       });
    }

    loadJob()

  }
}
