// angular.module('guard', ['ionic', 'guard.controllers', 'guard.directives', 'guard.services'])

angular.module('starter')

.config(function($locationProvider, $ionicConfigProvider, $stateProvider) {
  $locationProvider.html5Mode(true);

  $ionicConfigProvider.tabs.position('bottom');

  $stateProvider
    .state('guard', {
      url: '/guard',
      abstract: true,
      templateUrl: 'guard/menu.html'
    })
    .state('guard.order', {
      url: '/order/:type',
      cache: false,
      views: {
        'tab-order': {
          templateUrl: 'guard/order.html'
        }
      }
    })
    .state('guard.flow', {
      url: '/flow/:type',
      cache: false,
      views: {
        'tab-flow': {
          templateUrl: 'guard/flow.html'
        }
      }
    })
    .state('guard.account', {
      url: '/account/:type',
      cache: false,
      views: {
        'tab-account': {
          templateUrl: 'guard/account.html'
        }
      }
    })
    .state('login', {
      url: '/login/:type',
      templateUrl: 'guard/login.html'
    })
    .state('resetPassword', {
      url: '/resetPassword/:type',
      templateUrl: 'guard/resetPassword.html'
    })
    .state('guardRule', {
      url: '/guardRule',
      templateUrl: 'guard/rule.html'
    })
    .state('guardInfo', {
      url: '/guardInfo/:type',
      templateUrl: 'guard/info.html'
    })
    .state('guardInfoEdit', {
      url: '/guardInfoEdit/:type',
      templateUrl: 'guard/infoEdit.html'
    })
    .state('guardPromteCode', {
      url: '/guardPromteCode/:type',
      templateUrl: 'guard/promteCode.html'
    })
    .state('guardNotice', {
      url: '/guardNotice/:type',
      templateUrl: 'guard/notice.html'
    })
});
