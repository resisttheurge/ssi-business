export default function($authentication) {
  const $user = {
    loggedIn: false,
    username: '',
    roles: [],
    loginInProgress: false,
    lastLoginFailed: false,
    lastLoginFailureMessage: undefined,
    logout: () => {
      $user.loggedIn = false
      $user.username = ''
      $user.roles = []
      $user.loginInProgress = false
      $user.lastLoginFailed = false
      $user.lastLoginFailureMessage = undefined
    },
    login: (username, password, callback = () => {}) => {
      $user.logout()
      $user.loginInProgress = true
      $authentication.login({username, password}, function(response){
        if(response.success) {
          $user.loggedIn = true
          $user.username = response.data.username
          $user.roles = response.data.roles
        } else {
          $user.lastLoginFailed = true
          $user.lastLoginFailureMessage = response.message
        }
        $user.loginInProgress = false
        callback($user)
      })
    },
    isLoggedIn: () => $user.loggedIn,
    isLoggedOut: () => !$user.loggedIn,
    isLoginInProgress: () => $user.loginInProgress,
    didLastLoginFail: () => $user.lastLoginFailed,
    didLastLoginFailWithMessage: () => $user.lastLoginFailed && $user.lastLoginFailureMessage,
    hasRole: (role) => $user.isLoggedIn && $user.roles.indexOf(role) !== -1
  }
  return $user
}
