import { ApiService } from 'utils'
import { pdfConverter } from 'utils'

export default class Report extends ApiService {
  /*@ngInject*/
  constructor ($resource, endpoint, q$, $unpack, pdfConverter) {

    this.endpoint = $resource(endpoint + '/reports/:reportTitle', {}, {
        generate: { method: 'POST' }
      })

    this.generate = function (pdf) {
      return q$(function (resolve, reject) {
        if (!pdf) {
          return reject('cannot create')

        } else {

          return resolve(this.endpoint.generate(pdf).$promise.then($unpack).pdfConverter(pdf))
        }
      })
    }
  }
}
