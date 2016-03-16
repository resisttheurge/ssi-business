import { ApiService } from 'utils'
export default class ShippingGroup extends ApiService {
  /*@ngInject*/
  constructor ($resource, endpoint, $q, $unpack) {
    super()

    var service = this;
    var self = this;

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

    this.endpoint = $resource(endpoint + '/shipping-groups/:shippingGroupId', {}, {
        create: { method: 'POST' },
        update: { method: 'PATCH' },
        query: { method: 'GET', params:{ shippingGroupId: '' } }
      });

    this.get = function ($scope, resultObj, shippingGroupId)
    {
      service.$scope = $scope;
      service.resultObj = resultObj;
      return this.endpoint.query({ shippingGroupId: shippingGroupId }, resultExtension).$promise;
    }

    self.update = function (item) {
        return $q(function (resolve, reject) {
          if (!item) {
            return reject('cannot update without a parameter')
          } else if (!item.id) {
            return reject('cannot update object with missing id')
          } else {
            return resolve(self.endpoint.update({ shippingGroupId: item.id }, item).$promise.then($unpack))
          }
        })
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
