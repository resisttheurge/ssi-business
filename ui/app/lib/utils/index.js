// my mind's telling me no
import angular from 'angular'

export strip from './strip'

export AbstractController from './AbstractController'
export DetailController from './DetailController'
export ListController from './ListController'

export AbstractService from './AbstractService'
export ApiService from './ApiService'

export pdfConverter from '.pdfConverter'

export default
  angular
    .module('ssi.utils', [])
