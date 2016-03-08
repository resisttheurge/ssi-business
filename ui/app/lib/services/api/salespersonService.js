'use strict'
angular.module('ssiServices')
  .service('Salesperson', ['$resource', 'endpointUrl',
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

      this.endpoint = $resource(endpointUrl + '/salespeople/:salespersonId', {}, {
        create: {method: 'POST'},
        update: {method: 'PATCH'},
        query: {method: 'GET', params:{salespersonId: ''}}
      });

      this.get = function($scope, resultObj, salespersonId)
      {
        service.$scope = $scope;
        service.resultObj = resultObj;
        this.endpoint.get({'salespersonId': salespersonId}, resultExtension)
      }

      this.get = function($scope, resultObj)
      {
        service.$scope = $scope;
        service.resultObj = resultObj;
        this.endpoint.get(resultExtension)
      }
    }
  ])
