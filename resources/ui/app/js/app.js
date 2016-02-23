'use strict'

var ssiApp =
  angular.module("ssiApp",
    [
      'ngRoute',
      'ssiControllers',
      'ssiServices'
    ]
  )

ssiApp.constant('endpointUrl', 'http://localhost/api')

ssiApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider
      .when('/jobs', {
        templateUrl: 'partials/jobs.html',
        controller: 'JobListController'
      })
      .when('/jobs/:jobId', {
        templateUrl: 'partials/job-detail.html',
        controller: 'JobDetailController'
      })
      .otherwise({
        redirectTo: '/jobs'
      })
  }
])
