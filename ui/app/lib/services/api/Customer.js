export default class Customer {
  /*@ngInject*/
  constructor ($resource, endpoint) {

    var service = this;

    var resultExtension = function (response) {
        service.$scope.loading = true
        if (response.success) {
          angular.extend(service.resultObj, response.data);
        } else {
          service.$scope.error = true;
          service.$scope.message = response.message
        }

        service.$scope.loading = false
      }

    this.endpoint = $resource(endpoint + '/customers/:customerId', {}, {
        create: { method: 'POST' },
        update: { method: 'PATCH' },
        query: { method: 'GET', params:{ customerId: '' } }
      });

    this.get = function ($scope, resultObj, customerId)
    {
      service.$scope = $scope;
      service.resultObj = resultObj;
      return this.endpoint.get({ customerId: customerId }, resultExtension).$promise;
    }

    this.get = function ($scope, resultObj)
    {
      service.$scope = $scope;
      service.resultObj = resultObj;
      return this.endpoint.get(resultExtension).$promise;
    }
  }
}