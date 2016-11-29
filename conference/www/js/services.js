var baseURL = 'http://www.lifeuxuan.com/index.php';

angular.module('starter.services', ['ngResource'])

.factory('NearByEguard', function($resource) {
  return $resource(baseURL + '/eguards');
})

.factory('MainPageHot', function($resource) {
  return $resource(baseURL + '/hot/index');
})

.factory('NearByFruitShops', function($resource) {
  return $resource(baseURL + '/shoplist/fruit');
})

.factory('FruitsByShop', function($resource) {
  return $resource(baseURL + '/shop/fruit');
})

.factory('FruitDetail', function($resource) {
  return $resource(baseURL + '/product/fruit');
})

.factory('FruitPicShow', function($resource) {
  return $resource(baseURL + '/productshow/fruit');
})

.factory('FruitUxuanRank', function($resource) {
  return $resource(baseURL + '/rank/index/fruit');
})

.factory('FruitOrderInsert', function($resource) {
  return $resource(baseURL + '/order/insert/fruit');
})

.factory('QueryOrderList', function($resource) {
  return $resource(baseURL + '/orderlist/customer');
})

.factory('QueryOrderDetail', function($rootScope, $resource) {
  return $resource(baseURL + '/orderdetail/customer/fruit');
})

.factory('SendCheckCode', function($resource) {
  return $resource(baseURL + '/SendCheckCode.php');
})

.factory('CheckCheckCode', function($resource) {
  return $resource(baseURL + '/CheckCheckCode.php');
})

.factory('Search', function($resource) {
  return $resource(baseURL + '/Search.php');
})

.factory('WxPay', function($resource) {
  return $resource(baseURL + '/wxctrl/pay');
})

.service('WxPayParam', function($resource) {
  var param = {
    money: 0
  };
  this.set = function(input) {
    param = input;
  }
  this.get = function() {
    return param;
  }
})

.factory('WxPayConfirmFurit', function($resource) {
  return $resource(baseURL + '/payconfirm/fruit');
})

.factory('WxPayConfirmWash', function($resource) {
  return $resource(baseURL + '/payconfirm/wash');
})

.factory('StartPrice', function($resource) {
  return $resource(baseURL + '/communicate/customer/wash/startprice');
})

.service('FuritOrWash', function($resource) {
  var furitOrWash = 'furit';
  var washShopId = '000';
  var washOrderId = '000';
  var isReserve = false;
  this.toFurit = function() {
    furitOrWash = 'furit';
  }
  this.toWash = function(shopId, orderId, reserve) {
    furitOrWash = 'wash';
    washShopId = shopId;
    washOrderId = orderId;
    isReserve = reserve;
  }
  this.get = function() {
    return furitOrWash;
  }
  this.getParams = function() {
    return {
      washShopId: washShopId,
      washOrderId: washOrderId,
      isReserve: isReserve
    }
  }
})

;
