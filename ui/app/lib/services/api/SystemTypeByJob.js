import { ApiService } from 'utils'
export default class SystemTypeByJob extends ApiService {
  /*@ngInject*/
  constructor ($q, $unpack, $resource, endpoint) {
    super()
    this.endpoint = $resource(endpoint + '/jobs/:jobId/system-types/:systemTypeId', {}, {
      add: { method: 'POST', params: { systemTypeId: '' } },
      remove: { method: 'DELETE' },
      query: { method: 'GET', params: { systemTypeId: '' } }
    })

    this.list = ({ jobId }) =>
      $q(
        (resolve, reject) =>
          jobId
            ? resolve(this.endpoint.query({ jobId }).$promise.then($unpack))
            : reject('cannot call list without a valid { jobId } parameter')
      )

    this.add = ({ jobId }, systemType) =>
      $q(
        (resolve, reject) =>
          jobId && systemType && systemType.id
            ? resolve(this.endpoint.add({ jobId }, systemType).$promise.then($unpack))
            : reject('cannot call add without { jobId } and systemType parameters')
      )

    this.addAll = ({ jobId }, systemTypes = []) =>
      $q(
        (resolve, reject) =>
          jobId && systemTypes.every((item) => item && item.id)
            ? resolve($q.all(systemTypes.map(systemType => this.add({ jobId }, systemType))))
            : reject('cannot call addAll without valid { jobId } and systemTypes parameters')
      )

    this.remove = ({ jobId }, systemType) =>
      $q(
        (resolve, reject) =>
          jobId && systemType && systemType.id
            ? resolve(this.endpoint.remove({ jobId, systemTypeId: systemType.id }).$promise.then($unpack))
            : reject('cannot call remove without { jobId } and systemType parameters')
      )

    this.removeAll = ({ jobId }, systemTypes = []) =>
      $q(
        (resolve, reject) =>
          jobId && systemTypes.every((item) => item && item.id)
            ? resolve($q.all(systemTypes.map(systemType => this.remove({ jobId }, systemType))))
            : reject('cannot call removeAll without valid { jobId } and systemTypes parameters')
      )

    this.update = ({ jobId }, toAdd = [], toRemove = []) =>
      $q(
        (resolve, reject) =>
          jobId && toAdd.every((item) => item && item.id) && toRemove.every((item) => item && item.id)
            ? resolve($q.all([this.addAll({ jobId }, toAdd), this.removeAll({ jobId }, toRemove)]))
            : reject('cannot call addAll without valid { jobId }, toAdd, and toRemove parameters')
      )
  }
}
