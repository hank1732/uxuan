angular.module('starter')

.config(function($locationProvider, $ionicConfigProvider, $stateProvider) {
  $locationProvider.html5Mode(true);

  $ionicConfigProvider.tabs.position('bottom');

  $stateProvider
    .state('vendor', {
      url: '/vendor',
      abstract: true,
      templateUrl: 'vendor/menu.html'
    })
    .state('vendor.order', {
      url: '/order/:type',
      views: {
        'tab-order': {
          templateUrl: 'vendor/order.html'
        }
      }
    })
    .state('vendor.flow', {
      url: '/flow/:type',
      cache: false,
      views: {
        'tab-flow': {
          templateUrl: 'vendor/flow.html'
        }
      }
    })
    .state('vendor.account', {
      url: '/account/:type',
      cache: false,
      views: {
        'tab-account': {
          templateUrl: 'vendor/account.html'
        }
      }
    })
    .state('vendorOrderDetail', {
      url: '/vendor/orderDetail/:orderId/:orderType/:type',
      cache: false,
      templateUrl: 'vendor/orderDetail.html'
    })
    .state('vendorCashFlow', {
      url: '/vendor/cashFlow',
      cache: false,
      templateUrl: 'vendor/cashFlow.html'
    })
    .state('vendorRule', {
      url: '/vendorRule',
      templateUrl: 'vendor/rule.html'
    })
    .state('vendorInfo', {
      url: '/vendorInfo',
      templateUrl: 'vendor/info.html'
    })
    .state('vendorInfoEdit', {
      url: '/vendorInfoEdit/:type',
      templateUrl: 'vendor/infoEdit.html'
    })
    .state('vendorPromteCode', {
      url: '/vendorPromteCode/:type',
      templateUrl: 'vendor/promteCode.html'
    })
    .state('vendorNotice', {
      url: '/vendorNotice/:type',
      templateUrl: 'vendor/notice.html'
    })
});
