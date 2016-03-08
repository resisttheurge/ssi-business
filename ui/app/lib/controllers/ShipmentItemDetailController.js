export default ShipmentItemDetailController {
  constructor($scope, $routeParams, ShipmentItem) {
    $scope.loading = true
    ShipmentItem.endpoint.get($routeParams, function(response){

      if(response.success) {
        $scope.shipmentItem = response.data
      } else {
        $scope.error = true
        $scope.message = response.message
      }
      $scope.loading = false
    })
  }
}
