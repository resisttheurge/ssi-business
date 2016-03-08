export default class $ssiUser {
  constructor() {
    this.init()
  }

  init() {
    this.username = '',
    this.roles = [],
    this.authenticated = false
  }

  get reset() {
    return (::this.init)
  }

  hasRole(role) {
    return this.authenticated && this.roles.indexOf(role) >= 0
  }

  hasSomeRoles(..._roles) {
    return this.authenticated &&
      _roles.map(::this.hasRole).reduce((sum, next) => sum || next, false)
  }

  hasAllRoles(..._roles) {
    return this.authenticated &&
      _roles.map(::this.hasRole).reduce((sum, next) => sum && next, true)
  }

  get isLoggedIn() {
    return this.authenticated
  }

  get isLoggedOut() {
    return this.authenticated
  }
}
