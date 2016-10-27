// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.directives', 'starter.services', 'starter.washControllers', 'starter.washServices', 'starter.controllers'])

.run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            cordova.plugins.Keyboard.disableScroll(true);

        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }
    });
})

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider, $locationProvider) {
    $locationProvider.html5Mode(true);

    $ionicConfigProvider.tabs.position('bottom');

    $stateProvider

        .state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'templates/menu.html',
        controller: 'AppCtrl'
    })

    .state('app.index', {
        url: '/sessions',
        cache: false,
        views: {
            'tab-index': {
                templateUrl: 'templates/sessions.html',
                controller: 'SessionsCtrl'
            }
        }
    })

    .state('app.account', {
        url: '/account',
        cache: false,
        views: {
            'tab-account': {
                templateUrl: 'templates/account.html',
                controller: 'AccountCtrl'
            }
        }
    })

    .state('app.orders', {
        url: '/orders',
        cache: false,
        views: {
            'tab-orders': {
                templateUrl: 'templates/orders.html',
                controller: 'OrdersCtrl'
            }
        }
    })

    .state('app.cart', {
        url: '/cart',
        cache: false,
        views: {
            'tab-cart': {
                templateUrl: 'templates/order.html',
                controller: 'OrderCtrl'
            }
        }
    })

    .state('seller-list', {
        url: '/sellerList/:sellerId',
        cache: false,
        templateUrl: 'templates/sellerList.html',
        controller: 'sellerListCtrl'
    })

    .state('seller', {
        url: '/seller/:sellerId',
        cache: false,
        templateUrl: 'templates/seller.html',
        controller: 'sellerCtrl'
    })

    .state('orderStatus', {
        url: '/orderStatus',
        cache: false,
        templateUrl: 'templates/orderStatus.html',
        controller: 'OrderStatusCtrl'
    })

    .state('session', {
        url: '/sessions/:sessionId',
        cache: false,
        templateUrl: 'templates/session.html',
        controller: 'SessionCtrl'
    })

    .state('search', {
        url: '/search',
        templateUrl: 'templates/search.html',
        controller: 'SearchCtrl'
    })

    .state('orderDetail', {
        url: '/orderDetail/:orderId',
        cache: false,
        templateUrl: 'templates/orderDetail.html ',
        controller: 'orderDetailCtrl'
    })

    .state('phoneNumberCheck', {
        url: '/phoneNumberCheck',
        cache: false,
        templateUrl: 'templates/phoneNumberCheck.html ',
        controller: 'phoneNumberCheckCtrl'
    })

    .state('location', {
        url: '/location',
        template : "<div></div>",
        controller: function () {
            window.location.replace('/location.html');
        }
    })

    .state('washList', {
        url: '/washList',
        cache: false,
        templateUrl: 'washTemplates/washList.html ',
        controller: 'washListCtrl'
    })

    .state('washSingle', {
        url: '/washSingle/:washId',
        cache: false,
        templateUrl: 'washTemplates/washSingle.html ',
        controller: 'washSingleCtrl'
    })

    ;
    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/sessions');
});

