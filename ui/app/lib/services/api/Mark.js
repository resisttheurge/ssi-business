import { ApiService } from 'utils'
export default class Mark extends ApiService {
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

    this.endpoint = $resource(endpoint + '/marks/:markId', {}, {
        create: { method: 'POST' },
        update: { method: 'PATCH' },
        query: { method: 'GET', params:{ markId: '' } }
      });

    this.get = function ($scope, resultObj, markId)
    {
      service.$scope = $scope;
      service.resultObj = resultObj;
      return this.endpoint.query({ markId: markId }, resultExtension).$promise;
    }
  }
}
