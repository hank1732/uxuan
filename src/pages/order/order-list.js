angular.module('starter.controllers')

.controller('OrderListCtrl', function($rootScope, $scope, $state, OrderList, UserInfo,
  StartPrice, cancelFruit, cancelWash, WashReserveIdsList) {

  UserInfo.then(function(user) {
    getOrders();

    $scope.$on('order-status-change', function() {
      getOrders();
    })

    $scope.doRefresh = function() {
      getOrders();
      //Stop the ion-refresher from spinning
      $scope.$broadcast('scroll.refreshComplete');
    }

    $scope.clickPrice = function(event, order) {
      event.stopPropagation();
      event.preventDefault();
      StartPrice.save({
          orderId: order.orderId
        })
        .$promise
        .then(function(res) {
          WashReserveIdsList.id = [order.orderId]
          $state.go('shop-detail', {
            type: 'wash-order',
            shopId: order.shopId
          });
        });
    }

    $scope.clickRed = function(event, order) {
      event.stopPropagation();
      event.preventDefault();
      // let cancelMethod = order.orderType == 17001 ? cancelFruit : cancelWash;
      // cancelMethod.save({
      //     orderId: order.orderId
      //   })
      //   .$promise
      //   .then(function(res) {
      //     if (res.code === 0) {
      //       alert('取消成功');
      //       getOrders();
      //     }
      //   });
    }

    function getOrders() {
      OrderList.get({
        'customerId': user.userId,
        'pos': 0
      }, function(data) {
        $scope.orders = data.data;
      });
    }
  });
})
