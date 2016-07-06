import { ApiService } from 'utils'
export default class DrawingByJob extends ApiService {
  /*@ngInject*/
  constructor ($resource, endpoint, $unpack) {
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

    this.endpoint = $resource(endpoint + '/jobs/:jobId/drawings', {}, {
        query: { method: 'GET' }
      });

    this.list = jobId =>
      this.endpoint.query({ jobId }).$promise
        .then($unpack)

    this.get = function ($scope, resultObj, jobId)
    {
      service.$scope = $scope;
      service.resultObj = resultObj;
      return this.endpoint.get({ jobId: jobId }, resultExtension).$promise;
    }
  }
}
