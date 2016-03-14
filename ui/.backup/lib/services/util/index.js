import angular from 'angular'

import $unpackFactory from './$unpack'

export default
  angular.module('ssi.services.util', [])
    .factory('$unpack', $unpackFactory)
