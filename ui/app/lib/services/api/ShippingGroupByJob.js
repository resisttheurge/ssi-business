import { ApiService } from 'utils'
export default class ShippingGroupByJob extends ApiService {
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

    this.endpoint = $resource(endpoint + '/jobs/:jobId/shipping-groups', {}, {
        query: { method: 'GET' }
      });

    this.get = function ($scope, resultObj, shippingGroupId)
    {
      service.$scope = $scope;
      service.resultObj = resultObj;
      return this.endpoint.get({ shippingGroupId: shippingGroupId }, resultExtension).$promise;
    }

    this.list = jobId =>
      this.endpoint.query({ jobId }).$promise
        .then($unpack)
  }
}
