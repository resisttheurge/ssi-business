import { unpack } from 'utils'

import templateUrl from './template'

export const ssiCarrierDetail = {
  name: 'ssiCarrierDetail',
  config: {
    templateUrl,
    bindings: {

    },
    controller:
      class ssiCarrierDetailController {
        constructor($q, Restangular) {
          const $ctrl = this

          this.$routerOnActivate =
            next => {
              const id = next.params.carrierId
              Restangular
                .one('carriers', id).get()
                .then(unpack($q))
                .then(carrier => {
                  $ctrl.carrier = carrier
                })
            }
        }
      }
  }
}

export default ssiCarrierDetail.name
