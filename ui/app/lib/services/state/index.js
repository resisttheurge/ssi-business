import angular from 'angular'

import $ssiSelected from './$ssiSelected'
import $ssiUser from './$ssiUser'
import JobSearchParameters from './JobSearchParameters'

export default
  angular
    .module('ssi.services.state.old', [])
    .service('$ssiSelected', $ssiSelected)
    .service('$ssiUser', $ssiUser)
    .service('JobSearchParameters', JobSearchParameters)
