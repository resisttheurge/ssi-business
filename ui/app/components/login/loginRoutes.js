import loginTemplate from './loginTemplate'

export default function($stateProvider) {
  $stateProvider
    .state( 'login', {
      url: '/login',
      template: loginTemplate,
      controller: 'LoginController',
      access: {
        allowAnonymous: true,
        allowedRoles: ['ADMIN', 'EMPLOYEE']
      }
    })
}
