angular.module('starter.directives')

.directive('orderDetailGoodList', function() {
  return {
    restrict: 'E',
    scope: {
      listData: '=',
    },
    templateUrl: './build/components/good-list/order-detail-good-list.html'
  }
})

.directive('goodNearbyList', function() {
  return {
    restrict: 'E',
    scope: {
      listData: '=',
      listType: '@',
      listTitle: '@'
    },
    templateUrl: './build/components/good-list/nearby-list.html'
  }
})

.directive('hotList', function() {
  return {
    restrict: 'E',
    scope: {
      hotList: '=',
    },
    templateUrl: './build/components/good-list/hot-list.html',
    controller: function($scope, $timeout, $ionicScrollDelegate) {
      $scope.$watch('hotList', function(nv) {
        if (!nv) {
          return
        }
        nv.forEach(function(value) {
          if (value.productType == 17001) {
            value.href = '/good/fruit/' + value.productId;
          } else {
            value.href = '/shop/wash/' + value.shopId;
          }
        });
      })

      $timeout(function() {
        let sv = $ionicScrollDelegate.$getByHandle('horizontal').getScrollView();

        let container = sv.__container;

        let originaltouchStart = sv.touchStart;
        let originalmouseDown = sv.mouseDown;
        let originaltouchMove = sv.touchMove;
        let originalmouseMove = sv.mouseMove;

        container.removeEventListener('touchstart', sv.touchStart);
        container.removeEventListener('mousedown', sv.mouseDown);
        document.removeEventListener('touchmove', sv.touchMove);
        document.removeEventListener('mousemove', sv.mousemove);


        sv.touchStart = function(e) {
          e.preventDefault = function() {}
          originaltouchStart && originaltouchStart.apply(sv, [e]);
        }

        sv.touchMove = function(e) {
          e.preventDefault = function() {}
          originaltouchMove && originaltouchMove.apply(sv, [e]);
        }

        sv.mouseDown = function(e) {
          e.preventDefault = function() {}
          originalmouseDown && originalmouseDown.apply(sv, [e]);
        }

        sv.mouseMove = function(e) {
          e.preventDefault = function() {}
          originalmouseMove && originalmouseMove.apply(sv, [e]);
        }

        container.addEventListener("touchstart", sv.touchStart, false);
        container.addEventListener("mousedown", sv.mouseDown, false);
        document.addEventListener("touchmove", sv.touchMove, false);
        document.addEventListener("mousemove", sv.mouseMove, false);
      })
    }
  }
})
