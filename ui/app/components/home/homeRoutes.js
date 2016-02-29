import homeTemplate from './homeTemplate'

export default function($stateProvider) {
  $stateProvider
    .state( 'home', {
      url: '/home',
      template: homeTemplate,
      controller: 'HomeController',
      access: {
        allowAnonymous: false,
        allowedRoles: ['ADMIN', 'EMPLOYEE']
      }
    })
}
