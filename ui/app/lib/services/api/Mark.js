import { ApiService } from 'utils'
export default class Mark extends ApiService {
  /*@ngInject*/

constructor ($unpack, $q, $resource, endpoint, ShippingItem) {
    super()

    var service = this;
    var self = this;

    this.shippingItem = ShippingItem

    this.endpoint = $resource(endpoint + '/marks/:markId', {}, {
        create: { method: 'POST' },
        update: { method: 'PATCH' },
        query: { method: 'GET', params:{ markId: '' } }
      });

    //   old  get method
    this.get = id =>
      this.endpoint.get({ markId: id }).$promise
        .then($unpack)

    //  //old create method
    // this.create = mark =>
    //   $q(
    //     (resolve, reject) =>
    //       mark ?
    //         resolve(this.endpoint.create(mark).$promise.then($unpack))
    //       : reject('cannot call create without a parameter')
    //     )

    self.prepForCreate = mark =>
      $q(
        (resolve, reject) =>
          mark.shippingItem ?
            resolve(
              this.shippingItem.create(mark.shippingItem)
                .then(shippingItem => {
                  mark.shippingItem = shippingItem
                  return mark
                })
            )
          : resolve(mark)
      )

    self.create = function (mark) {
        return $q(function (resolve, reject) {
          if (!mark) {
            return reject('cannot call `mark.create` without a mark parameter')
          } else {
            return resolve(
              self.prepForCreate(mark)
                .then(mark =>
                  self.endpoint.create(mark).$promise
                    .then($unpack)
              )
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
            self.prepForUpdate(mark)
            return resolve(self.endpoint.update({ markId: mark.id }, mark).$promise.then($unpack))
          }
        })
      }

    self.prepForUpdate = mark =>
      $q(
        (resolve, reject) =>
          mark.shippingItem ?
            mark.shippingItem.id ?
              resolve(
                this.shippingItem.update(mark.shippingItem)
                  .then(() => mark)
              )
            : resolve(
                this.shippingItem.create(mark.shippingItem)
                    .then(shippingItem => {
                      mark.shippingItem = shippingItem
                      return mark
                    })
                )
            : resolve(mark)
        )

    this.delete = item =>
      $q(
        (resolve, reject) =>
          item && item.id ?
            resolve(this.endpoint.delete({ markId: item.id }, item).$promise.then($unpack))
          : reject('cannot call Mark.delete without a parameter')
      )

  }
}
