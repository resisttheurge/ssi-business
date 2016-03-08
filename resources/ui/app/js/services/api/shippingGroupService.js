'use strict'
angular.module('ssiServices')
  .service('ShippingGroup', ['$resource', 'endpointUrl',
    function($resource, endpointUrl) {

      var service = this;

      var resultExtension = function(response){
        service.$scope.loading = true
        if(response.success) {
          angular.extend(service.resultObj, response.data);
        } else {
          service.$scope.error = true
          service.$scope.message = response.message
        }
        service.$scope.loading = false
      }

      this.endpoint = $resource(endpointUrl + '/shipping-groups/:shippingGroupId', {}, {
        create: {method: 'POST'},
        update: {method: 'PATCH'},
        query: {method: 'GET', params:{shippingGroupId: ''}}
      });

      this.get = function($scope, resultObj, shippingGroupId)
      {
        service.$scope = $scope;
        service.resultObj = resultObj;
        return this.endpoint.query({'shippingGroupId' : shippingGroupId}, resultExtension).$promise;
      }
    }
  ])