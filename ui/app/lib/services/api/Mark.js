import { ApiService } from 'utils'
export default class Mark extends ApiService {
  /*@ngInject*/

constructor ($q, $unpack, $resource, endpoint) {
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

    this.create = item =>
      $q(
        (resolve, reject) =>
          item ?
            resolve(this.endpoint.create(item).$promise.then($unpack))
          : reject('cannot call create without a parameter')
        )

    self.update = function (item) {
        return $q(function (resolve, reject) {
          if (!item) {
            return reject('cannot update without a parameter')
          } else if (!item.id) {
            return reject('cannot update object with missing id')
          } else {
            return resolve(self.endpoint.update({ markId: item.id }, item).$promise.then($unpack))
          }
        })
      }

    this.delete = item =>
      $q(
        (resolve, reject) =>
          item && item.id ?
            resolve(this.endpoint.delete({ markId: item.id }, item).$promise.then($unpack))
          : reject('cannot call Mark.delete without a parameter')
      )

  }
}
