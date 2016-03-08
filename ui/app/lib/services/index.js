import api from './api'
import auth from './auth'
import state from './state'

export default {
  ...api,
  ...auth,
  ...state
}
