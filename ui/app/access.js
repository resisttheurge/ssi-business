export default function($rootScope, $state, userService) {
  $rootScope.$on('$stateChangeStart', function(event, next) {

    let allowed = true
    
    if(next.access && !next.access.allowAnonymous){
      allowed = false
      if(userService.user.isLoggedIn){
        for (role of userService.user.roles) {
          allowed = allowed || (access.allowedRoles.indexOf(role) !== -1)
        }
      }
    }

    if(!allowed){
      event.preventDefault()
      $state.go('login')
    }

  })
}
