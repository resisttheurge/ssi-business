import angular from 'angular'

import api from './api'
import auth from './auth'
import state from './state'

export default
  angular
    .module('ssi.services.old', [
      api.name,
      auth.name,
      state.name
    ])
