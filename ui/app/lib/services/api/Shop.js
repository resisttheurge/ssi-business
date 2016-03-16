import { ApiService } from 'utils'
export default class Shop extends ApiService {
  /*@ngInject*/
  constructor ($q, $unpack, $resource, endpoint) {
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

    this.update = item =>
      $q(
        (resolve, reject) =>
          item && item.id ?
            resolve(this.endpoint.update({ shopId: item.id }, item).$promise.then($unpack))
          : reject('cannot call create without a parameter')
      )

    this.create = item =>
      $q(
        (resolve, reject) =>
          item ?
            resolve(this.endpoint.create(item).$promise.then($unpack))
          : reject('cannot call create without a parameter')
      )
  }
}
