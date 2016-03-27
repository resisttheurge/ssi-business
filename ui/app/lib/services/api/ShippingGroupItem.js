import { ApiService } from 'utils'
export default class ShippingGroupshippingGroupItem extends ApiService {
  /*@ngInject*/
  constructor ($q, $unpack, $resource, endpoint,
    ShippingItemm, ShippingItemZone, ShippingItemZoneByShippingItem) {
    super()

    var service = this;
    var self = this;

    this.shippingItem = ShippingItem

    this.endpoint = $resource(
      endpoint + '/shipping-group-items/:shippingGroupItemId', {}, {
        create: { method: 'POST' },
        update: { method: 'PATCH' },
        query: { method: 'GET', params:{ shippingGroupItemId: '' } }
      })

    this.get = id =>
      this.endpoint.get({ shippingGroupItem: id }).$promise
        .then($unpack)
        .then(
          shippingGroupItem =>
              $q.all({
                shippingItem: ShippingItem.get(shippingGroupItem.shippingItem.id),
                shippingItemZones: ShippingItemZoneByShippingItem.list(shippingGroupItem.shippingItem.id)
              }).then(
                ({ shippingItem, shippingItemZones }) => ({
                  ...shippingGroupItem,
                  shippingItem,
                  shippingItemZones
                })
              )
          )

    // this.create = shippingGroupItem =>
    //   $q(
    //     (resolve, reject) =>
    //       shippingGroupItem ?
    //         resolve(this.endpoint.create(shippingGroupItem).$promise.then($unpack))
    //       : reject('cannot call create without a parameter')
    //   )

    self.prepForCreate = shippingGroupItem =>
      $q(
        (resolve, reject) =>
          shippingGroupItem.shippingItem ?
            resolve(
              this.shippingItem.create(shippingGroupItem.shippingItem)
                .then(shippingItem => {
                  shippingGroupItem.shippingItem = shippingItem
                  return shippingGroupItem
                })
            )
          : resolve(shippingGroupItem)
      )

    self.create = function (shippingGroupItem) {
        return $q(function (resolve, reject) {
          if (!shippingGroupItem) {
            return reject('cannot call `shippingGroupItem.create` without a shippingGroupItem parameter')
          } else {
            return resolve(
              self.prepForCreate(shippingGroupItem)
                .then(shippingGroupItem =>
                  self.endpoint.create(shippingGroupItem).$promise
                    .then($unpack)
              )
            )
          }
        })
      }

    self.update = function (shippingGroupItem) {
          return $q(function (resolve, reject) {
            if (!shippingGroupItem) {
              return reject('cannot update without a parameter')
            } else if (!shippingGroupItem.id) {
              return reject('cannot update object with missing id')
            } else {
              self.prepForUpdate(shippingGroupItem)
              return resolve(
                self.endpoint.update(
                  { shippingGroupItemId: shippingGroupItem.id },
                   shippingGroupItem).$promise.then($unpack))
            }
          })
        }

    self.prepForUpdate = shippingGroupItem =>
      $q(
        (resolve, reject) =>
          shippingGroupItem.shippingItem ?
            shippingGroupItem.shippingItem.id ?
              resolve(
                this.shippingItem.update(shippingGroupItem.shippingItem)
                  .then(() => shippingGroupItem)
              )
            : resolve(
                this.shippingItem.create(shippingGroupItem.shippingItem)
                    .then(shippingItem => {
                      shippingGroupItem.shippingItem = shippingItem
                      return shippingGroupItem
                    })
                )
            : resolve(shippingGroupItem)
        )

    this.delete = item =>
      $q(
        (resolve, reject) =>
          item && item.id ?
            resolve(this.endpoint.delete({ shippingGroupItemId: item.id }, item).$promise.then($unpack))
          : reject('cannot call shippingGroupItem.delete without a parameter')
      )

    // self.delete = function (shippingGroupItem) {
    //     return $q(function (resolve, reject) {
    //       if (!shippingGroupItem) {
    //         return reject(
    //           'cannot call `shippingGroupItem.delete` without a shippingGroupItem parameter')
    //       } else if (!shippingGroupItem.id) {
    //         return reject(
    //           'cannot call `shippingGroupItem.delete` on a shippingGroupItem object missing an `id` value')
    //       } else {
    //         return resolve(self.endpoint.delete({ shippingGroupItemId: shippingGroupItem.id },
    //           shippingGroupItem).$promise.then($unpack))
    //       }
    //     })
    //   }
  }
}
