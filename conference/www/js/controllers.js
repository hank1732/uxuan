angular.module('starter.controllers', []);

angular.module('starter.controllers')

.run(function run($rootScope) {
  // console.log(123);
  (function register() {
    $.ajax({
        url: 'http://www.lifeuxuan.com/backend/WxAddressCtrl.php',
        type: 'GET',
        dataType: 'json',
        data: {
          'url': window.location.href.split("#")[0]
        }
      })
      .done(function(e) {
        wx.config({
          debug: false,
          appId: e.appId,
          timestamp: e.timestamp,
          nonceStr: e.nonceStr,
          signature: e.signature,
          jsApiList: ['checkJsApi', 'openAddress', 'getLocation']
        });
        wx.error(function(res) {});
      })
      .fail(function(e) {
        // alert(e);
      })
      .always(function() {});

  })();
})

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $rootScope, $http) {
  // var config = {
  //     headers: {
  //         'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
  //     }
  // }
  // $http.post("http://www.lifeuxuan.com/backend/api/test.php", 'asd', config)
  //     .success(function(data, status, headers, config) {
  //         $scope.data = data;
  //     }).error(function(data, status, headers, config) {
  //         $scope.status = status;
  //     });
})

.controller('SessionsCtrl', function($scope, $rootScope, $timeout, MainPageHot, FruitUxuanRank, UserInfo, $ionicScrollDelegate) {
  $scope.location = {
    isGet: false,
    isOut: false,
    text: '定位中...'
  };
  UserInfo.then(function(user) {
    $scope.location = user.userLocation;
    $scope.location.text = user.userLocation.street + user.userLocation.streetNumber;
    MainPageHot.get({
      'longitude': user.longitude,
      'latitude': user.latitude
    }, function(data) {
      $scope.sessions = data.data;
    }, function(data) {
      alert('NO DATA MainPageHot');
    });

    FruitUxuanRank.get({
      'longitude': user.longitude,
      'latitude': user.latitude,
    }, function(data) {
      $scope.goods = data.data;
    }, function(data) {
      alert('NO DATA FruitUxuanRank');
    });
  })

  $timeout(function() {
    //return false; // <--- comment this to "fix" the problem
    var sv = $ionicScrollDelegate.$getByHandle('horizontal').getScrollView();

    var container = sv.__container;

    var originaltouchStart = sv.touchStart;
    var originalmouseDown = sv.mouseDown;
    var originaltouchMove = sv.touchMove;
    var originalmouseMove = sv.mouseMove;

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
  });

})

.controller('SessionCtrl', function($rootScope, $scope, $stateParams, $state, $ionicHistory, $ionicModal, UserInfo, FruitDetail, FruitPicShow, ShoppingCart) {
  $scope.isHideAddCart = false;
  $scope.singleNumber = 0;

  var cartNumber = 0;

  UserInfo.then(function(user) {
    FruitDetail.get({
      'longitude': user.longitude,
      'latitude': user.latitude,
      'productId': $stateParams.sessionId
    }, function(data) {
      $scope.session = data.data;
      cartNumber = ShoppingCart.get(data.data);
      $scope.singleNumber = cartNumber;
      $scope.cart = {
        number: ShoppingCart.getSellerCartNumber(data.data.sellerId)
      }
      if (cartNumber == 0) {
        $scope.isHideAddCart = false;
      } else {
        $scope.isHideAddCart = true;
      }
      FruitPicShow.get({
        'longitude': user.longitude,
        'latitude': user.latitude,
        'productId': $stateParams.sessionId
      }, function(data) {
        $scope.imgs = data.data;
      }, function(data) {
        alert('NO DATA');
      });
    }, function(data) {
      alert('NO DATA');
    });

})

.controller('sellerListCtrl', function($scope, $rootScope, $stateParams, NearByEguard, MainPageHot, FruitUxuanRank) {
  UserInfo.then(function(user) {
    NearByEguard.get({
      'longitude': user.longitude,
      'latitude': user.latitude,
    }, function(data) {
      $scope.eGuard = data.data;
    }, function(data) {
      alert('NO DATA');
    })

    MainPageHot.get({
      'longitude': user.longitude,
      'latitude': user.latitude,
    }, function(data) {
      $scope.sessions = data.data;
    }, function(data) {
      alert('NO DATA');
    });

    FruitUxuanRank.get({
      'longitude': user.longitude,
      'latitude': user.latitude,
    }, function(data) {
      $scope.goods = data.data;
    }, function(data) {
      alert('NO DATA');
    });
  });

})

.controller('sellerCtrl', function($scope, $stateParams, FruitsByShop, ShoppingCart, $ionicModal, UserInfo) {

  $scope.cart = { number: 0 };
  UserInfo.then(function(user) {
    FruitsByShop.get({
      'longitude': user.longitude,
      'latitude': user.latitude,
      'sellerId': $stateParams.sellerId
    }, function(data) {
      $scope.seller = data.data.shop;
      $scope.goods = getGoodQuuantity(data.data.shop.sellerId, data.data.products);
      $scope.totalNumber = ShoppingCart.getSellerCartNumber($scope.seller.sellerId);
    }, function(data) {
      alert('NO DATA');
    });
  });

})

.controller('OrderStatusCtrl', function($scope, $stateParams, $ionicHistory, $rootScope, orderStatus) {
  var status = orderStatus.get();
  console.log('111111111$rootScope.message', status);
  if (status == "ordered") {
    $scope.status = "下单成功,未支付";
    return;
  }
  if (status == "paied") {
    $scope.status = "支付成功";
    return;
  }
  $scope.status = "下单失败";
})

.controller('AccountCtrl', function($scope, $rootScope, UserInfo) {
  $scope.user = { img: 'img/avator.jpeg' };
  UserInfo.then(function(user) {
    $scope.user = user;
  })
  $scope.getAddress = function() {
    wx.ready(function() {
      wx.openAddress({
        success: function(res) {},
        cancel: function() {
          alert("fa");
        }
      });
    });
  }
})

.controller('OrdersCtrl', function($scope, $rootScope, QueryOrderList, PayConfirm, OrderCancel, UserInfo, orderStatus, $state) {

  UserInfo.then(function(user) {
    getOrders();

    $scope.$on("$ionicParentView.enter", function(event, data) {
      console.log('loaded');
      getOrders();
    });

    $scope.doRefresh = function() {
      console.log('Refreshing!', UserInfo.userid);
      getOrders();

      //Stop the ion-refresher from spinning
      $scope.$broadcast('scroll.refreshComplete');
    }

    $scope.rePay = function(e, order) {
      e.stopPropagation();
      e.preventDefault();
      (function ForwardPay() {
        $.ajax({
            url: 'http://www.lifeuxuan.com/backend/wxpay/pay/WxPayCtrl.php',
            type: 'GET',
            dataType: 'json',
            data: {
              //'openId': 'oDHyIvznjdxR2KFmyAjWMs2S0lyU',
              // 'payMoney': $scope.carts.allGoodsTotalMoney
              'payMoney': '1'
            }
          })
          .done(function(e) {
            // cleanCart();
            // alert(e);
            wx.ready(function() {
              // alert(e);
              wx.chooseWXPay({
                timestamp: e.timeStamp,
                nonceStr: e.nonceStr,
                package: e.package,
                signType: e.signType,
                paySign: e.paySign,
                success: function(res) {
                  console.log('paied success');
                  PayConfirm.get({
                    'longitude': user.longitude,
                    'latitude': user.latitude,
                    'orderId[]': [order.orderId]
                  }, function(data) {
                    getOrders();
                  });
                }
              });
            });

          })
          .fail(function(e) {})
          .always(function() {});
      })();
    }

    $scope.cancel = function(e, order) {
      e.stopPropagation();
      e.preventDefault();
      OrderCancel.get({
        'longitude': user.longitude,
        'latitude': user.latitude,
        'orderId': [order.orderId]
      }, function(data) {
        getOrders();
      });
    }

    function getOrders() {
      QueryOrderList.get({
        'longitude': user.longitude,
        'latitude': user.latitude,
        'userId': user.userId
      }, function(data) {
        $scope.orders = data.data;
      });
    }
  });
})

.controller('orderDetailCtrl', function($scope, $rootScope, $stateParams, QueryOrderDetail, PayConfirm, UserInfo) {
  UserInfo.then(function(user) {
    function getOrder(argument) {
      QueryOrderDetail.get({
        'longitude': user.longitude,
        'latitude': user.latitude,
        'orderId': $stateParams.orderId
      }, function(data) {
        $scope.order = data.data;
      });
    }
    getOrder();

    $scope.rePay = function(e, order) {
      e.stopPropagation();
      e.preventDefault();
      PayConfirm.get({
        'longitude': user.longitude,
        'latitude': user.latitude,
        'orderId': [$scope.order.orderId]
      }, function(data) {
        getOrder();
      });
    }
  })

})

.controller('phoneNumberCheckCtrl', function($scope, $rootScope, $interval, UserInfo, SendCheckCode, CheckCheckCode, $ionicHistory) {
  var e = {};
  $scope.check = {};
  $scope.check.time = 0;
  var timer = 0;

  UserInfo.then(function(user) {
    $scope.sendCode = function(e, order) {
      if ($scope.check.time > 0) {
        return;
      }
      SendCheckCode.get({
        'longitude': user.longitude,
        'latitude': user.latitude,
        'userPhoneNumber': user.phoneNumber
      }, function(data) {
        if (data.code == -1) {
          return;
        }
        $scope.check.time = 15;
        timer = $interval(function() {
          $scope.check.time--;
          if ($scope.check.time < 0) {
            $interval.cancel(timer);
          }
        }, 1000);
      })
    }

    $scope.checkCode = function(e, order) {
      var phoneNumber = $scope.check.phoneNumber;
      CheckCheckCode.get({
        'longitude': user.longitude,
        'latitude': user.latitude,
        'userPhoneNumber': phoneNumber,
        'checkCode': $scope.check.checkCode,
        'userId': user.userId,
        'XDEBUG_SESSION_START': '657409A8'
      }, function(data) {
        console.log(' checkcoode data.code', data.code);
        console.log(' checkcoode data.msg', data.msg);
        if (data.code == -1) {
          alert('验证失败');
          return;
        }
        console.log('$scope.check.phoneNumber', phoneNumber);
        UserInfo.phoneNumber = phoneNumber;
        UserInfo.verify = '1';
        $ionicHistory.backView().go();
      });
    }
  })


})

.controller('SearchCtrl', function($scope, UserInfo, Search) {

  $scope.search = {};
  $scope.searchGo = function(e, order) {
    Search.get({
      'latitude': user.latitude,
      'longitude': user.longitude,
      'keywords': $scope.search.keyword
    }, function(e) {
      $scope.search.goods = e.data.fruitProducts;
      $scope.search.sellers = e.data.fruitSellers;
    })
  }

})

;
