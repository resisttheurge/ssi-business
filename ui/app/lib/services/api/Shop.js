export default class Shop {
  /*@ngInject*/
  constructor ($resource, endpoint) {

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

    this.endpoint = $resource(endpoint + '/shops/:shopId', {}, {
        create: { method: 'POST' },
        update: { method: 'PATCH' },
        query: { method: 'GET', params:{ shopId: '' } }
      });

    this.get = function ($scope, resultObj, shopId)
    {
      service.$scope = $scope;
      service.resultObj = resultObj;
      this.endpoint.get({ shopId: shopId }, resultExtension)
    }

    this.get = function ($scope, resultObj)
    {
      service.$scope = $scope;
      service.resultObj = resultObj;
      this.endpoint.get(resultExtension)
    }
  }
}
