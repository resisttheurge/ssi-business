angular.module('ssiServices')
  .service('SpecialtyItem', ['$resource', 'endpointUrl',
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

      this.endpoint = $resource(endpointUrl + '/specialty-items/:specialtyItemId', {}, {
        create: {method: 'POST'},
        update: {method: 'PATCH'},
        query: {method: 'GET', params:{specialtyItemId: ''}}
      });

      this.get = function($scope, resultObj, specialtyItemId)
      {
        service.$scope = $scope;
        service.resultObj = resultObj;
        return this.endpoint.get({'specialtyItemId': specialtyItemId}, resultExtension).$promise;
      }

      this.get = function($scope, resultObj)
      {
        service.$scope = $scope;
        service.resultObj = resultObj;
        return this.endpoint.get(resultExtension).$promise;
      }
    }
  ])
