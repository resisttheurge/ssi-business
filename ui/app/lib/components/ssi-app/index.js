import templateUrl from './template'

import ssiDashboard from 'ssi-dashboard'
import ssiLogin from 'ssi-login'

export const ssiApp = {
  name: 'ssiApp',
  config: {
    templateUrl,
    bindings: {

    },
    controller: class ssiAppController {
      constructor() {

      }
    },
    $routeConfig: [
      { path: '/', name: 'Dashboard', useAsDefault: true, component: ssiDashboard },
      { path: '/login', name: 'Login', component: ssiLogin }
    ]
  }
}

export default ssiApp.name
