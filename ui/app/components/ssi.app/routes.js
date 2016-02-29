import home from './homeTemplate'

export default function($urlRouterProvider, $stateProvider) {
  $urlRouterProvider.otherwise('/home')
  $stateProvider
    .state( 'home', {
      url: '/home',
      template: home,
      controller: 'HomeController',
      controllerAs: 'home'
    })
}
