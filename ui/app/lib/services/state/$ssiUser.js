import { AbstractService } from 'utils'

export default class $ssiUser extends AbstractService {
  /*@ngInject*/
  constructor($q, $ssiAuth) {
    super()

    this.init()

    this.logout = () => $q((resolve, reject) => resolve(this.reset()))

    this.login = ({ username, password }) =>
      $ssiAuth.endpoint
        .login({ username, password }).$promise
        .then(response =>
          $q((resolve, reject) =>
            response.success
              ? resolve(response.data)
              : reject(response.message)
          )
        )
        .then(data => {
          this.username = data.username
          this.roles = data.roles
          this.authenticated = true
          return data
        })
  }

  init() {
    this.username = '',
    this.roles = [],
    this.authenticated = false
  }

  reset() {
    return this.init()
  }

  hasRole(role) {
    return this.authenticated && this.roles.indexOf(role) >= 0
  }

  hasSomeRoles(_roles) {
    return this.authenticated &&
      _roles.map(::this.hasRole).reduce((sum, next) => sum || next, false)
  }

  hasAllRoles(_roles) {
    return this.authenticated &&
      _roles.map(::this.hasRole).reduce((sum, next) => sum && next, true)
  }

  get isLoggedIn() {
    return this.authenticated
  }

  get isLoggedOut() {
    return !this.authenticated
  }
}
