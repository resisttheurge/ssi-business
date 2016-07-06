/*@ngInject*/
export default function themeConfig($mdThemingProvider) {
  $mdThemingProvider
    .theme('default')

  $mdThemingProvider
    .theme('default-dark')
    .dark()

  $mdThemingProvider.alwaysWatchTheme(true)
}
