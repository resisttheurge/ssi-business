import { unpack } from 'utils'

import ssiCarrierDetail from 'ssi-carrier-detail'

import templateUrl from './template'

export const ssiCarrierList = {
  name: 'ssiCarrierList',
  config: {
    templateUrl,
    bindings: {

    },
    controller: class ssiCarrierListController {
      constructor($q, Restangular) {
        const $ctrl = this

        this.$routerOnActivate = next => {
          Restangular
            .all('carriers').getList()
            .then(unpack($q))
            .then(carriers => {
              $ctrl.carriers = carriers
            })
        }
      }
    },
    $routeConfig: [
      { path: '/:carrierId', name: 'Carrier Detail', component: ssiCarrierDetail }
    ]
  }
}

export default ssiCarrierList.name
