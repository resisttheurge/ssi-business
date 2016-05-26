import { ApiService } from 'utils'
export default class ShippingGroupByJob extends ApiService {
  /*@ngInject*/
  constructor ($resource, endpoint, $unpack) {
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

    this.endpoint = $resource(endpoint + '/jobs/:jobId/shipping-groups', {}, {
        query: { method: 'GET' }
      });

    this.get = function ($scope, resultObj, shippingGroupId)
    {
      service.$scope = $scope;
      service.resultObj = resultObj;
      return this.endpoint.get({ shippingGroupId: shippingGroupId }, resultExtension).$promise;
    }

    this.list = ({ jobId }) =>
      this.endpoint.query({ jobId }).$promise
        .then($unpack)
        .then(groups => groups.map(::this.sgStringToDate))
        .then(groups => groups.map(::this.sgPadLines))

    this.padLines = address =>
      !address ?
        {
          lines: [{ id: 0, value: '' }],
          city: '',
          stateOrProvince: '',
          postalCode: '',
          country: ''
        }
      : {
          ...address,
          lines: address.lines ?
            address.lines.map((line, index) => ({ id: index, value: line }))
          : [{ id: 0, value: '' }]
        }

    this.sgPadLines = sg => {
      const { info } = sg
      const { address } = info ? info : {}
      return {
        ...sg,
        info: {
          ...info,
          address: this.padLines(address)
        }
      }
    }

    this.sgStringToDate = sg => {
      const { info } = sg
      const { revisionDate, startDate, shopDate, fieldDate, requestDate } = info ? info : {}
      return {
        ...sg,
        info: {
          ...info,
          revisionDate: revisionDate ? $convertDate.stringToDate(revisionDate) : undefined,
          startDate: startDate ? $convertDate.stringToDate(startDate) : undefined,
          shopDate: shopDate ? $convertDate.stringToDate(shopDate) : undefined,
          fieldDate: fieldDate ? $convertDate.stringToDate(fieldDate) : undefined,
          requestDate: requestDate ? $convertDate.stringToDate(requestDate) : undefined
        }
      }
    }

    this.sgDateToString = sg => {
      const { info } = sg
      const { revisionDate, startDate, shopDate, fieldDate, requestDate } = info ? info : {}
      return {
        ...sg,
        info: {
          ...info,
          revisionDate: revisionDate ? revisionDate.toISOString().substring(0, 10) : undefined,
          startDate: startDate ? startDate.toISOString().substring(0, 10) : undefined,
          shopDate: shopDate ? shopDate.toISOString().substring(0, 10) : undefined,
          fieldDate: fieldDate ? fieldDate.toISOString().substring(0, 10) : undefined,
          requestDate: requestDate ? requestDate.toISOString().substring(0, 10) : undefined
        }
      }
    }
  }
}
