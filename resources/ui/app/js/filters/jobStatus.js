'use strict'

angular.module('ssi.filters.jobStatus', [])
  .filter('jobStatus', [
    function() {
      return function jobStatus(job) {
        if(job && job.status) {
          switch(job.status) {
            case 'INACTIVE': return 'Inactive'
            case 'ACTIVE': return 'Active'
            case 'COMPLETED': return 'Completed'
            case 'CANCELLED': return 'Cancelled'
            case 'DELETED': return 'Deleted'
          }
        } else {
          throw new TypeError('input to filter `jobStatus` must be a `job` object with a valid `status` field')
        }
      }
    }
  ])
