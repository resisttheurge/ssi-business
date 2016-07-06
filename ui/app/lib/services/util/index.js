import angular from 'angular'

import $unpackFactory from './$unpack'

import $convertDate from './$convertDate'

export default
  angular.module('ssi.services.util', [])
    .factory('$unpack', $unpackFactory)
    .service('$convertDate', $convertDate)
