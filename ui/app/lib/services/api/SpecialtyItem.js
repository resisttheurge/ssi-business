import { ApiService } from 'utils'
export default class SpecialtyItem extends ApiService {
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

    this.endpoint = $resource(endpoint + '/specialty-items/:specialtyItemId', {}, {
        create: { method: 'POST' },
        update: { method: 'PATCH' },
        query: { method: 'GET', params:{ specialtyItemId: '' } }
      });

    this.get = function ($scope, resultObj, specialtyItemId)
    {
      service.$scope = $scope;
      service.resultObj = resultObj;
      return this.endpoint.get({ specialtyItemId: specialtyItemId }, resultExtension).$promise;
    }

    this.get = function ($scope, resultObj)
    {
      service.$scope = $scope;
      service.resultObj = resultObj;
      return this.endpoint.get(resultExtension).$promise;
    }

    this.create = item =>
      $q(
        (resolve, reject) =>
          item ?
            resolve(this.endpoint.create(item).$promise.then($unpack))
          : reject('cannot call create without a parameter')
      )
  }
}
