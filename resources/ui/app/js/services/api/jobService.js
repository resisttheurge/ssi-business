'use strict'
angular.module('ssiServices')
  .service('Job', ['$resource', 'endpointUrl',
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


       this.endpoint = $resource(endpointUrl + '/jobs/:jobId', {}, {
        create: {method: 'POST'},
        update: {method: 'PATCH'},
        query: {method: 'GET', params:{jobId: ''}}
      });

      this.get = function($scope, resultObj, jobId)
      {
        service.$scope = $scope;
        service.resultObj = resultObj;
        return this.endpoint.get({'jobId' : jobId}, resultExtension).$promise;
      }

    }
  ])
