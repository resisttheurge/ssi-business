import { ListController } from 'utils'

export default class UserListController extends ListController {
  /*@ngInject*/
  constructor($scope, User, $filter, $q, $mdDialog, $mdToast, $ssiUser) {
    super()

    $scope.$ssiUser = $ssiUser;

    var orderBy = $filter('orderBy')
    $scope.query = {
      page: 1,
      limit: 10,
      order: 'id'
    }

    $scope.onPaginate = function (page, limit) {
      return getUsers(angular.extend({}, $scope.query, { page: page, limit: limit }))
    }

    $scope.onReorder = function (order) {
      return getUsers(angular.extend({}, $scope.query, { order: order }))
    }

    $scope.delete = item =>
      $mdDialog.show(
        $mdDialog.confirm()
          .title(`Are you sure?`)
          .textContent(`Are you sure you want to delete user ${item.username}?`)
          .ok('ok')
          .cancel('cancel')
      )
      .then(() => User.delete(item))
      .then(
        () =>
          $mdToast.show(
            $mdToast.simple()
              .textContent(`Deleted user ${item.username}`)
              .position('bottom right')
          )
          .then(() => $route.reload()),
        reason => $mdToast.show(
          $mdToast.simple()
            .textContent(`Could not delete user ${item.username} because ${reason}`)
            .position('bottom right')
          )
      )

    $scope.resetPassword = function (item)
    {
      item.password = 'RESET';

      User.update(item).then(
        function (data) {
          $mdDialog.show(
            $mdDialog
              .alert()
              .title('Password Reset!')
              .textContent('The password for User: ' + item.username + ' has been temporarily set to \n"RESET"\n Upon using this new password to login, they will be prompted to provide a new password.')
              .ok('Close')
          )
        }, function (error) {

          $mdDialog.show(
            $mdDialog.alert()
              .title('Failed to Reset Password')
              .textContent('There has been an error, changes have not been saved')
              .ok('Close')
          )
        })

    }

    function getUsers(query) {
      return $scope.promise =
        User.endpoint.query().$promise
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

    function store(users) {
      return $scope.users = users
    }

    getUsers($scope.query)
  }
}
