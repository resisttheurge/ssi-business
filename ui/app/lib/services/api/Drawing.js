export default class Drawing {
  constructor ($resource, endpointUrl) {

    var service = this;

    var resultExtension = function (response) {
        service.$scope.loading = true
        if (response.success) {
          angular.extend(service.resultObj, response.data);
        } else {
          service.$scope.error = true
          service.$scope.message = response.message
        }

        service.$scope.loading = false
      }

    this.endpoint = $resource(endpointUrl + '/drawings/:drawingId', {}, {
        create: { method: 'POST' },
        update: { method: 'PATCH' },
        query: { method: 'GET', params:{ drawingId: '' } }
      });

    this.get = function ($scope, resultObj, drawingId)
    {
      service.$scope = $scope;
      service.resultObj = resultObj;
      return this.endpoint.get({ drawingId: drawingId }, resultExtension).$promise;
    }
  }
}
