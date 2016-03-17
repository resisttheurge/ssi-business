import { DetailController } from 'utils'

export default class ShippingGroupDetailController extends DetailController {
  /*@ngInject*/
  constructor($scope, $routeParams, ShippingGroup, enums, $ssiSelected, $mdDialog) {
    super()

    $scope.tagTypes = enums.tagTypes
    $scope.loading  = true
    $scope.job = $ssiSelected.job;
    $scope.shippingGroup = $ssiSelected.shippingGroup;

    ShippingGroup.endpoint.get($routeParams, function (response) {
      if (response.success) {
        $scope.shippingGroup = response.data
      } else {
        $scope.error = true
        $scope.message = response.message
      }

      $scope.loading = false
    })

    if ($scope.shippingGroup != null) {
      $scope.revisionDateDisplay = $scope.shippingGroup.info.revisionDate != null ?
     $convertDate.stringToDate($scope.shippingGroup.info.revisionDate) : undefined

      $scope.startDateDisplay = $scope.shippingGroup.info.startDate != null ?
     $convertDate.stringToDate($scope.shippingGroup.info.startDate) : undefined

      $scope.shopDateDisplay = $scope.shippingGroup.info.shopDate != null ?
       $convertDate.stringToDate($scope.shippingGroup.info.shopDate) : undefined

      $scope.fieldDateDisplay = $scope.shippingGroup.info.fieldDate != null ?
     $convertDate.stringToDate($scope.shippingGroup.info.fieldDate) : undefined

      $scope.requestDateDisplay = $scope.shippingGroup.info.requestDate != null ?
     $convertDate.stringToDate($scope.shippingGroup.info.requestDate) : undefined
    } else {
      $scope.revisionDateDisplay = undefined
      $scope.startDateDisplay = undefined
      $scope.shopDateDisplay = undefined
      $scope.fieldDateDisplay = undefined
      $scope.requestDateDisplay = undefined
    }

    $scope.update = function update(item)
    {
      ShippingGroup.update(item).then(function (data) { $mdDialog
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

  }

  // function convertDate(item) {
  //   return $q(function (resolve, reject) {
  //     console.log('converting Dates')
  //       $scope.revisionDateDisplay = data.drawing.info.revisionDate != null ?
  //        $convertDate.stringToDate(data.drawing.info.revisionDate) : undefined
  //
  //       $scope.startDateDisplay = data.drawing.info.startDate != null ?
  //        $convertDate.stringToDate(data.drawing.info.startDate) : undefined
  //
  //       $scope.shopDateDisplay = data.drawing.info.shopDate != null ?
  //          $convertDate.stringToDate(data.drawing.info.shopDate) : undefined
  //
  //       $scope.dueDateDisplay = data.drawing.info.dueDate != null ?
  //        $convertDate.stringToDate(data.drawing.info.dueDate) : undefined
  //
  //       $scope.completeDateDisplay = data.drawing.info.completeDate != null ?
  //        $convertDate.stringToDate(data.drawing.info.completeDate) : undefined
  //
  //        return resolve(data)
  //      })
}
