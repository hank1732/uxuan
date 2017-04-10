angular.module('starter.services')

.factory('userWechatInfo', function($resource) {
  return $resource('http://www.lifeuxuan.com/index.php/user/basicinfo');
})

.factory('userRegister', function($resource) {
  return $resource('http://www.lifeuxuan.com/index.php/user/register');
})

.factory('Location', function($q) {

  var deferred = $q.defer();
  // var userLocation = {
  //   'latitude': 31.214197,
  //   'longitude': 121.496322,
  //   'isOut': false,
  //   'isGet': true,
  //   'text': '测试定位'
  // };

  var userLocation = JSON.parse(localStorage.getItem('userLocation')) || {
    'latitude': 121.446322,
    'longitude': 31.199345,
    'isOut': false,
    'isGet': true
  };

  if (userLocation.isSearchGeo) {
    GetAddress(userLocation.latitude, userLocation.longitude);
  } else {
    var geolocation = new BMap.Geolocation();
    geolocation.getCurrentPosition(function(r) {
      if (this.getStatus() == BMAP_STATUS_SUCCESS) {
        // alert('您的位置：' + r.point.lng + ',' + r.point.lat);
        userLocation.latitude = r.point.lat;
        userLocation.longitude = r.point.lng;
        GetAddress(userLocation.latitude, userLocation.longitude);
      } else {
        alert('failed' + this.getStatus());
      }
    }, {
      enableHighAccuracy: true
    })
  }

  function GetAddress(lat, lng) {
    const point = new BMap.Point(lng, lat);
    var gc = new BMap.Geocoder();
    gc.getLocation(point, function(rs) {
      var addComp = rs.addressComponents;
      userLocation.province = addComp.province;
      userLocation.city = addComp.city;
      userLocation.district = addComp.district;
      userLocation.street = addComp.street;
      userLocation.streetNumber = addComp.streetNumber;
      if (addComp.city != '上海市') {
        userLocation.isOut = true;
      } else {
        userLocation.isOut = false;
      }
      userLocation.isSearchGeo = false;
      localStorage.setItem('userLocation', JSON.stringify(userLocation));
      deferred.resolve(userLocation);
    });
  }

  // for test
  // if (window.location.hostname == "localhost") {
  // deferred.resolve(userLocation);
  // return deferred.promise;
  // }
  return deferred.promise;
})

.factory('UserInfo', function($resource, $q, $timeout, userWechatInfo, userRegister, Location) {
  var deferred = $q.defer();
  var user = {
    userId: 'C0000000001'
  }
  Location.then(function(userLocation) {
    // user default value
    user.latitude = userLocation.latitude;
    user.longitude = userLocation.longitude;
    user.userLocation = userLocation;

    // ------------for test-----------------
    if (window.location.hostname == "localhost") {
      deferred.resolve(user);
      return deferred.promise;
    }
    // ------------for test-----------------

    userWechatInfo.get({}, function(e) {
      user.name = e.data.nickname;
      user.img = e.data.headimgurl;
      user.openid = e.data.openid;
      user.headPicUrl = e.data.headimgurl;
      if (user.name == '哈库那玛塔塔') {
        // screenLog.init({ autoScroll: true });
      }
      userRegister.get({
        'latitude': user.latitude,
        'longitude': user.longitude,
        'openId': user.openid,
        'username': user.nickname,
        'password': '',
        'headPicUrl': user.headPicUrl
      }, function(e) {
        if (e.data) {
          user.userId = e.data.userId;
          user.verify = e.data.verifyCode;
          var address = e.data.lastAddress;
          user.rcvAddress = address.rcvAddress;
          user.rcvPhone = address.rcvPhone;
          user.rcvName = address.rcvName;

          console.log('rcvPhone', user.rcvPhone);
          deferred.resolve(user);
        }
      })
    });
  })

  return deferred.promise;
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
          // alert("fa");
        }
      });
    });
  }
})

;
