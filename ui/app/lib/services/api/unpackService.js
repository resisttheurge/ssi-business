'use strict'
angular.module('ssiServices')
  .factory('$unpack', [
    '$q',
    function($q) {
      return function $unpack(response) {
        return $q(function(resolve, reject){
          if(!response) {
            return reject('cannot unpack empty response')
          } else if(!response.success) {
            return reject(response.message ? response.message : 'API response failed with no message')
          } else if(!response.data) {
            return reject('API response was successful but contained no data')
          } else {
            return resolve(response.data)
          }
        })
      }
    }
  ])
