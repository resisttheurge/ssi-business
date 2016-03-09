import angular from 'angular'

import jobSearch from './jobSearch'
import jobStatus from './jobStatus'
import jobTitle from './jobTitle'
import unwords from './unwords'
import words from './words'

export default
  angular
    .module('ssi.filters.old', [])
      .filter('jobSearch', jobSearch)
      .filter('jobStatus', jobStatus)
      .filter('jobTitle', jobTitle)
      .filter('unwords', unwords)
      .filter('words', words)
