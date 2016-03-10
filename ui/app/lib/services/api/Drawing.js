import { ApiService } from 'utils'
export default class Drawing extends ApiService {
  /*@ngInject*/
  constructor ($resource, endpoint) {
    super()

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

    this.endpoint = $resource(endpoint + '/drawings/:drawingId', {}, {
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
