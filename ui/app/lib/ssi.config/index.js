import angular from 'angular'

import locationConfig from 'location.config'
import themeConfig from 'theme.config'

export default
  angular.module('ssi.config', [])
    .config(locationConfig)
    .config(themeConfig)
    .name
