'use strict'

var apiServices = angular.module(
  'apiServices',
  [
    'ngResource'
  ]
)

apiServices.factory('Addendum', ['$resource', 'endpointUrl',
  function($resource, endpointUrl) {
    return $resource(endpointUrl + '/addenda/:addendumId', {}, {
      create: {method: 'POST'},
      update: {method: 'PATCH'},
      query: {method: 'GET', params:{addendumId: ''}}
    })
  }
])

apiServices.factory('Address', ['$resource', 'endpointUrl',
  function($resource, endpointUrl) {
    return $resource(endpointUrl + '/addresses/:addressId', {}, {
      create: {method: 'POST'},
      update: {method: 'PATCH'},
      query: {method: 'GET', params:{addressId: ''}}
    })
  }
])

apiServices.factory('AuthService', ['$resource', 'endpointUrl',
  function($resource, endpointUrl) {
    return $resource(endpointUrl + '/auth', {}, {
      login: {method: 'POST'}
    })
  }
])

apiServices.factory('Carrier', ['$resource', 'endpointUrl',
  function($resource, endpointUrl) {
    return $resource(endpointUrl + '/carriers/:carrierId', {}, {
      create: {method: 'POST'},
      update: {method: 'PATCH'},
      query: {method: 'GET', params:{carrierId: ''}}
    })
  }
])

apiServices.factory('Contact', ['$resource', 'endpointUrl',
  function($resource, endpointUrl) {
    return $resource(endpointUrl + '/contacts/:contactId', {}, {
      create: {method: 'POST'},
      update: {method: 'PATCH'},
      query: {method: 'GET', params:{contactId: ''}}
    })
  }
])

apiServices.service('Customer', ['$resource', 'endpointUrl',
  function($resource, endpointUrl) {

    var service = this;

    var resultExtension = function(response){
      service.$scope.loading = true
      if(response.success){
        angular.extend(service.resultObj, response.data);
      } else {
        service.$scope.error = true;
        service.$scope.message = response.message
      }
      service.$scope.loading = false
    }

    this.endpoint = $resource(endpointUrl + '/customers/:customerId', {}, {
      create: {method: 'POST'},
      update: {method: 'PATCH'},
      query: {method: 'GET', params:{customerId: ''}}
    });

    this.get = function($scope, resultObj, customerId)
    {
      service.$scope = $scope;
      service.resultObj = resultObj;
      this.endpoint.get({'customerId': customerId}, resultExtension)
    }

    this.get = function($scope, resultObj)
    {
      service.$scope = $scope;
      service.resultObj = resultObj;
      this.endpoint.get(resultExtension)
    }
  }
])

apiServices.factory('Drawing', ['$resource', 'endpointUrl',
  function($resource, endpointUrl) {
    return $resource(endpointUrl + '/drawings/:drawingId', {}, {
      create: {method: 'POST'},
      update: {method: 'PATCH'},
      query: {method: 'GET', params:{drawingId: ''}}
    })
  }
])

apiServices.factory('MarkByDrawing', ['$resource', 'endpointUrl',
  function($resource, endpointUrl) {
    return $resource(endpointUrl + '/drawings/:drawingId/marks', {}, {
      query: {method: 'GET'}
    })
  }
])

apiServices.service('Job', ['$resource', 'endpointUrl',
  function($resource, endpointUrl) {

    var service = this;

    var resultExtension = function(response){
      service.$scope.loading = true
      if(response.success) {
        angular.extend(service.resultObj, response.data);
      } else {
        service.$scope.error = true
        service.$scope.message = response.message
      }
      service.$scope.loading = false
    }


     this.endpoint = $resource(endpointUrl + '/jobs/:jobId', {}, {
      create: {method: 'POST'},
      update: {method: 'PATCH'},
      query: {method: 'GET', params:{jobId: ''}}
    });

    this.get = function($scope, resultObj, jobId)
    {
      service.$scope = $scope;
      service.resultObj = resultObj;
      this.endpoint.get({'jobId' : jobId}, resultExtension);
    }

  }
])

apiServices.factory('AddendumByJob', ['$resource', 'endpointUrl',
  function($resource, endpointUrl) {
    return $resource(endpointUrl + '/jobs/:jobId/addenda', {}, {
      query: {method: 'GET'}
    })
  }
])

apiServices.factory('JobAddresses', ['$resource', 'endpointUrl',
  function($resource, endpointUrl) {
    return $resource(endpointUrl + '/jobs/:jobId/addresses', {}, {
      create: {method: 'POST'},
      query: {method: 'GET'}
    })
  }
])

apiServices.factory('JobSchedules', ['$resource', 'endpointUrl',
  function($resource, endpointUrl) {
    return $resource(endpointUrl + '/jobs/:jobId/schedules', {}, {
      query: {method: 'GET'}
    })
  }
])

apiServices.factory('DrawingByJob', ['$resource', 'endpointUrl',
  function($resource, endpointUrl) {
    return $resource(endpointUrl + '/jobs/:jobId/drawings', {}, {
      query: {method: 'GET'}
    })
  }
])

apiServices.factory('PartOrderByJob', ['$resource', 'endpointUrl',
  function($resource, endpointUrl) {
    return $resource(endpointUrl + '/jobs/:jobId/part-orders', {}, {
      query: {method: 'GET'}
    })
  }
])

apiServices.factory('ShippingGroupByJob', ['$resource', 'endpointUrl',
  function($resource, endpointUrl) {
    return $resource(endpointUrl + '/jobs/:jobId/shipping-groups', {}, {
      query: {method: 'GET'}
    })
  }
])

apiServices.factory('ShipmentByJob', ['$resource', 'endpointUrl',
  function($resource, endpointUrl) {
    return $resource(endpointUrl + '/jobs/:jobId/shipments', {}, {
      query: {method: 'GET'}
    })
  }
])

apiServices.factory('SystemTypeByJob', ['$resource', 'endpointUrl',
  function($resource, endpointUrl) {
    return $resource(endpointUrl + '/jobs/:jobId/system-types', {}, {
      add: {method: 'POST'},
      remove: {method: 'DELETE'},
      query: {method: 'GET'}
    })
  }
])

apiServices.factory('ZoneByJob', ['$resource', 'endpointUrl',
  function($resource, endpointUrl) {
    return $resource(endpointUrl + '/jobs/:jobId/zones', {}, {
      query: {method: 'GET'}
    })
  }
])

apiServices.factory('Manufacturer', ['$resource', 'endpointUrl',
  function($resource, endpointUrl) {
    return $resource(endpointUrl + '/manufacturers/:manufacturerId', {}, {
      create: {method: 'POST'},
      update: {method: 'PATCH'},
      query: {method: 'GET', params:{manufacturerId: ''}}
    })
  }
])

apiServices.factory('Mark', ['$resource', 'endpointUrl',
  function($resource, endpointUrl) {
    return $resource(endpointUrl + '/marks/:markId', {}, {
      create: {method: 'POST'},
      update: {method: 'PATCH'},
      query: {method: 'GET', params:{markId: ''}}
    })
  }
])

apiServices.factory('PartOrder', ['$resource', 'endpointUrl',
  function($resource, endpointUrl) {
    return $resource(endpointUrl + '/part-orders/:partOrderId', {}, {
      create: {method: 'POST'},
      update: {method: 'PATCH'},
      query: {method: 'GET', params:{partOrderId: ''}}
    })
  }
])

apiServices.factory('Part', ['$resource', 'endpointUrl',
  function($resource, endpointUrl) {
    return $resource(endpointUrl + '/parts/:partId', {}, {
      create: {method: 'POST'},
      update: {method: 'PATCH'},
      query: {method: 'GET', params:{partId: ''}}
    })
  }
])

apiServices.factory('Report', ['$resource', 'endpointUrl',
  function($resource, endpointUrl) {
    return $resource(endpointUrl + '/reports/:reportTitle', {}, {
      generate: {method: 'POST'}
    })
  }
])

apiServices.service('Salesperson', ['$resource', 'endpointUrl',
  function($resource, endpointUrl) {

    var service = this;

    var resultExtension = function(response){
      service.$scope.loading = true
      if(response.success) {
        angular.extend(service.resultObj, response.data);
      } else {
        service.$scope.error = true
        service.$scope.message = response.message
      }
      service.$scope.loading = false
    }

    this.endpoint = $resource(endpointUrl + '/salespeople/:salespersonId', {}, {
      create: {method: 'POST'},
      update: {method: 'PATCH'},
      query: {method: 'GET', params:{salespersonId: ''}}
    });

    this.get = function($scope, resultObj, salespersonId)
    {
      service.$scope = $scope;
      service.resultObj = resultObj;
      this.endpoint.get({'salespersonId': salespersonId}, resultExtension)
    }

    this.get = function($scope, resultObj)
    {
      service.$scope = $scope;
      service.resultObj = resultObj;
      this.endpoint.get(resultExtension)
    }
  }
])

apiServices.factory('Schedule', ['$resource', 'endpointUrl',
  function($resource, endpointUrl) {
    return $resource(endpointUrl + '/schedules/:scheduleId', {}, {
      create: {method: 'POST'},
      update: {method: 'PATCH'},
      query: {method: 'GET', params:{scheduleId: ''}}
    })
  }
])

apiServices.factory('Shipment', ['$resource', 'endpointUrl',
  function($resource, endpointUrl) {
    return $resource(endpointUrl + '/shipments/:shipmentId', {}, {
      create: {method: 'POST'},
      update: {method: 'PATCH'},
      query: {method: 'GET', params:{shipmentId: ''}}
    })
  }
])

apiServices.factory('ShipmentItemByShipment', ['$resource', 'endpointUrl',
  function($resource, endpointUrl) {
    return $resource(endpointUrl + '/shipments/:shipmentId/items', {}, {
      query: {method: 'GET'}
    })
  }
])

apiServices.factory('ShipmentItem', ['$resource', 'endpointUrl',
  function($resource, endpointUrl) {
    return $resource(endpointUrl + '/shipment-items/:shipmentItemId', {}, {
      create: {method: 'POST'},
      update: {method: 'PATCH'},
      query: {method: 'GET', params:{shipmentItemId: ''}}
    })
  }
])

apiServices.factory('ShippingGroup', ['$resource', 'endpointUrl',
  function($resource, endpointUrl) {
    return $resource(endpointUrl + '/shipping-groups/:shippingGroupId', {}, {
      create: {method: 'POST'},
      update: {method: 'PATCH'},
      query: {method: 'GET', params:{shippingGroupId: ''}}
    })
  }
])

apiServices.factory('ShippingGroupItemByShippingGroup', ['$resource', 'endpointUrl',
  function($resource, endpointUrl) {
    return $resource(endpointUrl + '/shipping-groups/:shippingGroupId/items', {}, {
      query: {method: 'GET'}
    })
  }
])

apiServices.factory('ShippingGroupItem', ['$resource', 'endpointUrl',
  function($resource, endpointUrl) {
    return $resource(endpointUrl + '/shipping-group-items/:shippingGroupItemId', {}, {
      create: {method: 'POST'},
      update: {method: 'PATCH'},
      query: {method: 'GET', params:{shippingGroupItemId: ''}}
    })
  }
])

apiServices.factory('ShippingItem', ['$resource', 'endpointUrl',
  function($resource, endpointUrl) {
    return $resource(endpointUrl + '/shipping-items/:shippingItemId', {}, {
      create: {method: 'POST'},
      update: {method: 'PATCH'},
      query: {method: 'GET', params:{shippingItemId: ''}}
    })
  }
])

apiServices.factory('ShippingItemZoneByShippingItem', ['$resource', 'endpointUrl',
  function($resource, endpointUrl) {
    return $resource(endpointUrl + '/shipping-items/:shippingItemId/zones', {}, {
      query: {method: 'GET'}
    })
  }
])

apiServices.factory('ShippingItemZone', ['$resource', 'endpointUrl',
  function($resource, endpointUrl) {
    return $resource(endpointUrl + '/shipping-item-zones/:shippingItemZoneId', {}, {
      create: {method: 'POST'},
      update: {method: 'PATCH'},
      query: {method: 'GET', params:{shippingItemZoneId: ''}}
    })
  }
])

apiServices.service('Shop', ['$resource', 'endpointUrl',
  function($resource, endpointUrl) {

    var service = this;

    var resultExtension = function(response){
      service.$scope.loading = true
      if(response.success) {
        angular.extend(service.resultObj, response.data);
      } else {
        service.$scope.error = true
        service.$scope.message = response.message
      }
      service.$scope.loading = false
    }

    this.endpoint = $resource(endpointUrl + '/shops/:shopId', {}, {
      create: {method: 'POST'},
      update: {method: 'PATCH'},
      query: {method: 'GET', params:{shopId: ''}}
    });

    this.get = function($scope, resultObj, shopId)
    {
      service.$scope = $scope;
      service.resultObj = resultObj;
      this.endpoint.get({'shopId': shopId}, resultExtension)
    }

    this.get = function($scope, resultObj)
    {
      service.$scope = $scope;
      service.resultObj = resultObj;
      this.endpoint.get(resultExtension)
    }
  }
])

apiServices.factory('SpecialtyItem', ['$resource', 'endpointUrl',
  function($resource, endpointUrl) {
    return $resource(endpointUrl + '/specialty-items/:specialtyItemId', {}, {
      create: {method: 'POST'},
      update: {method: 'PATCH'},
      query: {method: 'GET', params:{specialtyItemId: ''}}
    })
  }
])

apiServices.factory('SystemType', ['$resource', 'endpointUrl',
  function($resource, endpointUrl) {
    return $resource(endpointUrl + '/system-types/:systemTypeId', {}, {
      create: {method: 'POST'},
      update: {method: 'PATCH'},
      query: {method: 'GET', params:{systemTypeId: ''}}
    })
  }
])

apiServices.factory('User', ['$resource', 'endpointUrl',
  function($resource, endpointUrl) {
    return $resource(endpointUrl + '/users/:userId', {}, {
      create: {method: 'POST'},
      update: {method: 'PATCH'},
      query: {method: 'GET', params:{userId: ''}}
    })
  }
])

apiServices.factory('Vendor', ['$resource', 'endpointUrl',
  function($resource, endpointUrl) {
    return $resource(endpointUrl + '/vendors/:vendorId', {}, {
      create: {method: 'POST'},
      update: {method: 'PATCH'},
      query: {method: 'GET', params:{vendorId: ''}}
    })
  }
])

apiServices.factory('Zone', ['$resource', 'endpointUrl',
  function($resource, endpointUrl) {
    return $resource(endpointUrl + '/zones/:zoneId', {}, {
      create: {method: 'POST'},
      update: {method: 'PATCH'},
      query: {method: 'GET', params:{zoneId: ''}}
    })
  }
])
