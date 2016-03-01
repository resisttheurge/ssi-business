import loginTemplate from './loginTemplate'

export default function($stateProvider) {
  $stateProvider
    .state( 'login', {
      url: '/login',
      template: loginTemplate,
      controller: 'LoginController',
      controllerAs: 'loginController',
      data: {
        allowAnonymous: true,
        allowedRoles: ['ADMIN', 'EMPLOYEE']
      }
    })
}
