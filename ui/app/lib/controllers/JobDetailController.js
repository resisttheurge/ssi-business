import { DetailController, strip } from 'utils'

export default class JobDetailController extends DetailController {
  /*@ngInject*/
  constructor(
    $scope, $route, $location, $routeParams, $q, Address, Customer, Job, Schedule,
    Shop, Salesperson, enums, $filter, $mdDialog, $unpack, $convertDate,
    JobAddresses, JobSchedules, $log
  ) {
    super()

    function filter(expression, comparator) {
      return function (array) {
        return $q(function (resolve, reject) {
          return resolve($filter('filter')(array, expression, comparator))
        })
      }
    }

    $scope.prefixes     = enums.prefixes
    $scope.jobStatuses  = enums.jobStatuses

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

    $scope.addAddressLine = type =>
      $scope.jobAddresses ?
        $scope.jobAddresses[type] ?
          $scope.jobAddresses[type].lines ?
            $scope.jobAddresses[type].lines = [
              ...$scope.jobAddresses[type].lines,
              {
                id: $scope.jobAddresses[type].lines.length,
                value: ''
              }]
          : $scope.jobAddresses[type].lines = [{ id: 0, value: '' }]
        : $scope.jobAddresses[type] = { lines: [{ id: 0, value: '' }] }
      : $scope.jobAddresses = { [type]: { lines: [{ id: 0, value: '' }] } }

    function loadJob() {
      $log.debug('begin loadJob')
      return loading()
        .then(() => do {
          $log.debug(JSON.stringify($routeParams))
          $q.all({
            job: Job.get($routeParams),
            jobAddresses: JobAddresses.get($routeParams),
            jobSchedules: JobSchedules.get($routeParams)
          })
        })

        .then(store)
        .then(loaded)
        .catch(reason => $log.error(JSON.stringify(reason)))
    }

    function loaded(data) {
      return $q((resolve, reject) => do {
        $log.debug('done loading')
        $scope.mode = ''
        resolve(data)
      })
    }

    function loading(data) {
      return $q(function (resolve, reject) {
        $log.debug('loading')
        $scope.mode = 'indeterminate'
        return resolve(data)
      })
    }

    function store({ job, jobAddresses, jobSchedules }) {
      return $q(function (resolve, reject) {
        $log.debug('storing job')
        return resolve(do {
          $scope.job = job
          $scope.jobAddresses = jobAddresses
          $scope.jobSchedules = jobSchedules
          { job, jobAddresses, jobSchedules }
        })
      })
    }

    if ($routeParams.jobId) {

      $scope.update = function update(job, jobAddresses, jobSchedules)
      {
        if (job.identifier.prefix &&
            job.identifier.year &&
            job.identifier.label &&
            job.status) {
          Job.updateFull(job, jobAddresses, jobSchedules)
          .then(function (data) {
            $mdDialog
              .show(
                $mdDialog.alert()
                  .title('Changes Saved!')
                  .textContent('Changes to this record have been saved')
                  .ok('Close')
              ).then(() => $route.reload())
          }, function (error) {

            $log.error(JSON.stringify(error))
            $mdDialog
              .show(
                $mdDialog.alert()
                  .title('Failed to Save')
                  .textContent('There has been an error, changes have not been saved')
                  .ok('Close')
            )
          });
        } else {
          $mdDialog
          .show(
            $mdDialog.alert()
              .title('Failed to Save')
              .textContent('Invalid data')
              .ok('Close')
          )
        }
      }

      loadJob()
    } else {
      $scope.job = {
        identifier: {
          prefix: 'F',
          year: new Date().getFullYear()
        },
        status: 'ACTIVE'
      }

      $scope.jobAddresses = {
        shipping: {
          lines: [{ id: 0, value: '' }]
        },
        invoicing: {
          lines: [{ id: 0, value: '' }]
        }
      }

      $scope.create = function create(job, jobAddresses, jobSchedules)
      {
        if (
          job.identifier.prefix &&
          job.identifier.year &&
          job.identifier.label &&
          job.status
        ) {
          Job.createFull(job, jobAddresses, jobSchedules)
          .then(
            data =>
              $mdDialog.show(
                $mdDialog.alert()
                  .title('Record created!')
                  .textContent('This record has been saved to the database')
                  .ok('Close')
              ).then(() => $location.path(`/jobs/${data.id}`)),
            error => {
              $log.error(JSON.stringify(error))
              $mdDialog.show(
                $mdDialog.alert()
                  .title('Failed to create record')
                  .textContent('There has been an error, record could not be created')
                  .ok('Close')
              )
            }
          )
        } else {
          $mdDialog
           .show($mdDialog.alert()
           .title('Failed to Save')
           .textContent('Invalid data')
         .ok('Close'))
        }
      }
    }
  }
}
