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

    //   old  get method
    this.get = function ($scope, resultObj, markId)
    {
      service.$scope = $scope;
      service.resultObj = resultObj;
      return this.endpoint.query({ markId: markId }, resultExtension).$promise;
    }

    //  //old create method
    // this.create = mark =>
    //   $q(
    //     (resolve, reject) =>
    //       mark ?
    //         resolve(this.endpoint.create(mark).$promise.then($unpack))
    //       : reject('cannot call create without a parameter')
    //     )

    self.create = function (mark) {
        return $q(function (resolve, reject) {
          if (!mark) {
            return reject('cannot call `mark.create` without a mark parameter')
          } else {
            return resolve(mark =>
              self.endpoint.create(self).$promise
                .then($unpack)
            )
          }
        })
      }

    self.update = function (mark) {
        return $q(function (resolve, reject) {
          if (!mark) {
            return reject('cannot update without a parameter')
          } else if (!mark.id) {
            return reject('cannot update object with missing id')
          } else {
            return resolve(self.endpoint.update({ markId: mark.id }, mark).$promise.then($unpack))
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
