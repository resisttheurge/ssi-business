export default function($rootScope, $state, $user) {
  $rootScope.$on('$stateChangeStart', function(event, next) {

    let allowed = true
    
    if(next.data && !next.data.allowAnonymous){
      allowed = false
      if($user.isLoggedIn() ){
        for (let role of next.data.allowedRoles) {
          allowed = allowed || $user.hasRole(role)
        }
      }
    }

    if(!allowed){
      event.preventDefault()
      $state.go('login')
    }

  })
}
