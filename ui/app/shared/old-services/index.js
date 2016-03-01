import angular from 'angular'

import apiServices from './apiServices'
import coreServices from './coreServices'

export default
  angular.module('ssi.services.old', [
    apiServices,
    coreServices
  ])
    .name
